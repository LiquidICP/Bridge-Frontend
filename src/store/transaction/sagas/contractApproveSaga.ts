/* eslint-disable no-console */
/* eslint-disable no-empty-pattern */
import { Principal } from '@dfinity/principal';
import { getContract } from 'api/contract';
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import { ethers, ContractTransaction, ContractReceipt } from 'ethers';
import { metamaskSelectors } from 'store/metamask/selectors';
import { plugSelectors } from 'store/plug/selector';
import { getBridgeContract } from 'api/bridgeContract';
import { notification } from 'antd';
import { callApi } from 'utils/api';
import { TransactionData, WrappedToken } from 'store/types';
import { getDfinityContract } from 'api/dfinityContract';
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
  const tx:ContractTransaction = yield contract.approve(
    bridgeAddress,
    WICPAmount,
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait approve',
  });
  yield tx.wait();

  const bridgeContract = getBridgeContract();
  const bridgeTx:ContractTransaction = yield bridgeContract.requestBridgingToStart(
    token,
    WICPAmount,
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
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
      polygonTransactionId: bridgeData.blockHash,
    },
  });
  yield put(transactionSetState({
    status: responce.state,
  }));

  if (responce.state === 'in_progress') {
    notification.success({
      message: 'Success',
      description: `Transaction from polygon to dfinity${responce.state}`,
    });
  } else {
    notification.error({
      message: 'Error',
      description: `Transaction from polygon to dfinity was ${responce.state}`,
    });
  }
}

function* plugToMetamask(
  metamaskAddress:string,
  accountId:string,
  amount:number,
) {
  const transfer:string = yield plugTransfer(canisterAddress, amount.toString());
  if (transfer) {
    const responce:WrappedToken = yield call(callApi, {
      method: 'POST',
      url: '/wrapper-token',
      data: {
        uAddress: accountId,
        amount: Number(ethers.utils.parseUnits(amount.toString(), 8).toString()),
      },
    });
    console.log(responce);
  }
  const tokenActor:SERVICE = yield getDfinityContract();
  yield tokenActor.approve(
    Principal.fromText(plugbridgeAddress),
    ethers.utils.parseUnits(amount.toString(), 8).toBigInt(),
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 0,
  });
  const responce:TransactionData = yield call(callApi, {
    method: 'POST',
    url: '/save-transaction',
    data: {
      sender: accountId,
      senderType: 'dfinity',
      amount: ethers.utils.parseUnits(amount.toString(), 8).toString(),
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
      description: `Transaction from dfinity to polygon ${responce.state}`,
    });
  } else {
    notification.error({
      message: 'Error',
      description: `Transaction from dfinity to polygon was ${responce.state}`,
    });
  }

  yield put(metamaskGetTokensBalance());
}

export function* contractApproveSaga({}:ReturnType<typeof contractApprove>) {
  try {
    const { address } = yield select(metamaskSelectors.getState);
    const { accountId } = yield select(plugSelectors.getState);
    const { from, receiving, amount } = yield select(transactionSelector.getState);
    if (from === 'plug') {
      yield plugToMetamask(
        address,
        accountId,
        receiving,
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
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* transactionSagas() {
  yield takeLatest(TransactionActionsType.APPROVE, contractApproveSaga);
}
