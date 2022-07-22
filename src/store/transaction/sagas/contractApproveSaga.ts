/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-empty-pattern */
import { Principal } from '@dfinity/principal';
import { getContract } from 'api/contract';
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  BigNumber,
  ethers,
  ContractTransaction,
  ContractReceipt,
} from 'ethers';
import { metamaskSelectors } from 'store/metamask/selectors';
import { plugSelectors } from 'store/plug/selector';
import { getBridgeContract } from 'api/bridgeContract';
import { getDfinityContract } from 'api/dfinityContract';
import { notification } from 'antd';
import { callApi } from 'utils/api';
import { TransactionData } from 'store/types';
import {
  SERVICE,
} from 'abi/dfinityToken/types';
import { plugTransfer } from 'api/plugTransfer';
import { metamaskGetTokensBalance } from 'store/metamask/actionCreators';
import {
  metamaskbridgeAddress,
  tokenAddress,
  plugbridgeAddress,
  canisterAddress,
} from '../../../global/constants';
import { contractApprove, transactionSetState } from '../actionCreator';
import { transactionSelector } from '../selector';
import { TransactionActionsType } from '../actionTypes';

function* allowancePolygon(contract: any, userAddress: string, bridgeAddress: string) {
  const allowanceWei: BigNumber = yield contract.allowance(
    userAddress,
    bridgeAddress,
  );
  const allowance = allowanceWei.toNumber();
  return allowance;
}

function* metamaskToPlug(
  bridgeAddress:string,
  token:string,
  metamaskAddress:string,
  accountId: string,
  amount:string,
  from:string,
) {
  const WICPAmount = ethers.utils.parseUnits(amount, 8).toString();
  const contract = getContract();
  if (!contract) {
    notification.info({
      message: 'ERROR',
      description: 'Please install Metamask',
      duration: 10,
    });
    return;
  }

  try {
    const tx:ContractTransaction = yield contract.approve(
      bridgeAddress,
      WICPAmount,
    );
    notification.info({
      message: 'INFO',
      description: 'Please wait approve',
      duration: 10,
    });
    yield tx.wait();
  } catch (err) {
    console.log(err);
    sagaExceptionHandler('The transaction has changed. Confirm new transaction');
  }

  const allowance: number = yield call(allowancePolygon, contract, metamaskAddress, bridgeAddress);
  // console.log('allowance_no error:', allowance); // *************

  const bridgeContract = getBridgeContract();
  if (allowance <= Number(WICPAmount)) {
    const delta = Number(WICPAmount) - allowance;
    const txn:ContractTransaction = yield contract.increaseAllowance(metamaskAddress, delta);
    yield txn.wait();
  }
  const bridgeTx:ContractTransaction = yield bridgeContract.requestBridgingToStart(
    token,
    WICPAmount,
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 10,
  });
  const bridgeData:ContractReceipt = yield bridgeTx.wait();

  const responce:TransactionData = yield call(callApi, {
    method: 'POST',
    url: '/save-transaction',
    data: {
      sender: metamaskAddress,
      senderType: from,
      amount: WICPAmount,
      recipient: accountId,
      recipientType: 'dfinity',
      polygonTransactionId: bridgeData.transactionHash,
    },
  });

  yield put(transactionSetState({
    status: responce.state,
  }));

  if (responce.state === 'in_progress') {
    notification.success({
      message: 'Success',
      description: 'Transaction from polygon to dfinity completes successfully',
    });
  } else {
    notification.error({
      message: 'Error',
      description: 'Transaction from polygon to dfinity failed',
    });
  }
}

function* plugToMetamask(
  metamaskAddress:string,
  accountId:string,
  receiving: number,
  amount:number,
) {
  const transfer:string = yield plugTransfer(canisterAddress, amount.toString());

  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 10,
  });
  if (transfer) {
    yield call(callApi, {
      method: 'POST',
      url: '/wrapper-token',
      data: {
        uAddress: accountId,
        amount: Number(ethers.utils.parseUnits(amount.toString(), 8).toString()),
      },
    });
  }
  const tokenActor:SERVICE = yield getDfinityContract();
  yield tokenActor.approve(
    Principal.fromText(plugbridgeAddress),
    ethers.utils.parseUnits(amount.toString(), 8).toBigInt(),
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 10,
  });
  const responce:TransactionData = yield call(callApi, {
    method: 'POST',
    url: '/save-transaction',
    data: {
      sender: accountId,
      senderType: 'dfinity',
      amount: ethers.utils.parseUnits(receiving.toString(), 8).toString(),
      recipient: metamaskAddress,
      recipientType: 'polygon',
    },
  });
  yield put(transactionSetState({
    status: responce.state,
  }));

  if (responce.state === 'in_progress') {
    notification.success({
      message: 'Success',
      description: 'Transaction from dfinity to polygon completed successfully',
    });
  } else {
    notification.error({
      message: 'Error',
      description: 'Transaction from dfinity to polygon failed',
    });
  }

  yield put(metamaskGetTokensBalance());
}

export function* contractApproveSaga({}:ReturnType<typeof contractApprove>) {
  try {
    const { address } = yield select(metamaskSelectors.getState);
    const { accountId } = yield select(plugSelectors.getState);
    const {
      from,
      amount,
      receiving,
    } = yield select(transactionSelector.getState);
    if (from === 'plug') {
      yield plugToMetamask(
        address,
        accountId,
        receiving,
        amount,
      );
    } else {
      yield metamaskToPlug(
        metamaskbridgeAddress,
        tokenAddress,
        address,
        accountId,
        amount,
        from,
      );
    }
  } catch (err: any) {
    // ************************
    console.log('Approve', err.message, err.fileName);
    // ***********************
    yield put(transactionSetState({
      status: 'reject',
    }));
    sagaExceptionHandler(err);
  }
}

export function* transactionSagas() {
  yield takeLatest(TransactionActionsType.APPROVE, contractApproveSaga);
}
