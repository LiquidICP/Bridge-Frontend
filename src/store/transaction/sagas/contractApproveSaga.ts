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

import { plugTransfer } from 'api/plugTransfer';
import { metamaskGetTokensBalance } from 'store/metamask/actionCreators';
import SERVICE from 'abi/dfinityToken/types';
import BRIDGESERVICE, { SuccesTxReceipt } from 'abi/dfinityBridge/bridgeTypes';
import { getDfinityBridgeContract } from 'api/dginityBridgeContract';
import {
  metamaskbridgeAddress,
  plugbridgeAddress,
  canisterAddress,
} from '../../../global/constants';
import { contractApprove, transactionSetState } from '../actionCreator';
import { transactionSelector } from '../selector';
import { TransactionActionsType } from '../actionTypes';
import { TransferPLUG } from '../types';

function* allowancePolygon(contract: any, userAddress: string, bridgeAddress: string) {
  const allowanceWei: BigNumber = yield contract.allowance(
    userAddress,
    bridgeAddress,
  );
  const allowance = allowanceWei.toNumber();
  return allowance;
}

function* callRequestBridgingToStart(
  bridgeContract:any,
  WICPAmount:string,
  accountId:string,
) {
  const bridgeTx:ContractTransaction = yield bridgeContract.requestBridgingToStart(
    WICPAmount,
    accountId,
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 10,
  });
  const bridgeData:ContractReceipt = yield bridgeTx.wait();

  if (bridgeData) {
    yield put(transactionSetState({
      status: 'in_progress',
    }));
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

function* metamaskToPlug(
  bridgeAddress:string,
  metamaskAddress:string,
  accountId: string,
  amount:string,
) {
  const contract = getContract();
  if (!contract) {
    notification.info({
      message: 'ERROR',
      description: 'Please install Metamask',
      duration: 10,
    });
    return;
  }
  const WICPAmount = ethers.utils.parseUnits(amount, 8).toString();
  const allowance: number = yield call(allowancePolygon, contract, metamaskAddress, bridgeAddress);
  const bridgeContract = getBridgeContract();
  if (allowance < Number(WICPAmount)) {
    const delta = Number(WICPAmount) - allowance;
    try {
      const txn:ContractTransaction =
    yield contract.increaseAllowance(bridgeAddress, delta);
      yield txn.wait();
      yield callRequestBridgingToStart(bridgeContract, WICPAmount, accountId);
    } catch (err: any) {
      if (err?.replacement && err?.reason === 'repriced') {
        yield callRequestBridgingToStart(bridgeContract, WICPAmount, accountId);
      }
    }
  }
}

function* plugToMetamask(
  metamaskAddress:string,
  accountId:string,
  receiving: number,
  amount:number,
) {
  const transfer:TransferPLUG = yield plugTransfer(canisterAddress, amount.toString());
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
        blockId: transfer.height,
      },
    });
  }
  const tokenActor:SERVICE = yield getDfinityContract();
  yield tokenActor.approve(
    Principal.fromText(plugbridgeAddress),
    ethers.utils.parseUnits(receiving.toString(), 8).toBigInt(),
  );
  notification.info({
    message: 'INFO',
    description: "Please don't close this page, wait Transaction and Allow next Transaction",
    duration: 15,
  });
  const bridgeActor:BRIDGESERVICE = yield getDfinityBridgeContract();
  const requestBrinddge:SuccesTxReceipt = yield bridgeActor.requestBridgingToEnd(
    ethers.utils.parseUnits(receiving.toString(), 8).toBigInt(),
    metamaskAddress,
  );
  notification.info({
    message: 'INFO',
    description: 'Please wait Transaction',
    duration: 4,
  });

  if (requestBrinddge.Ok) {
    yield put(transactionSetState({
      status: 'in_progress',
    }));
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
  const { address } = yield select(metamaskSelectors.getState);
  const { accountId } = yield select(plugSelectors.getState);
  const {
    from,
    amount,
    receiving,
  } = yield select(transactionSelector.getState);

  try {
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
        address,
        accountId,
        amount,
      );
    }
  } catch (err: any) {
    if (err?.replacement && err?.reason === 'repriced') {
      yield put(transactionSetState({
        status: 'in_progress',
      }));
      notification.success({
        message: 'Success',
        description: 'Transaction from polygon to dfinity completes successfully',
      });
      return;
    }
    yield put(transactionSetState({
      status: 'reject',
    }));
    sagaExceptionHandler(err);
  }
}

export function* transactionSagas() {
  yield takeLatest(TransactionActionsType.APPROVE, contractApproveSaga);
}
