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
import { TransactionData } from 'store/types';
import { getDfinityContract } from 'api/dfinityContract';
import {
  SERVICE,
  // SuccesTxReceipt
} from 'abi/dfinityToken/types';
import {
  metamaskbridgeAddress,
  tokenAddress,
  // plugbridgeAddress,
} from '../../../global/constants';
import { contractApprove, transactionSetState } from '../actionCreator';
import { transactionSelector } from '../selector';
import { TransactionActionsType } from '../actionTypes';

// const instenceOfSuccessTx = (object:any):object is SuccesTxReceipt => 'Ok' in object;

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
  console.log(responce);
  yield put(transactionSetState({
    status: responce.state,
  }));

  notification.success({
    message: 'Success',
    description: 'Success transaction',
  });
}

function* plugToMetamask(
  accountId:string,
  metamaskAddress:string,
  amount:string,
  from: string,
) {
  const tokenActor:SERVICE = yield getDfinityContract();
  const fee:bigint = yield tokenActor.getFeeRate();
  console.log(fee);
  if (!tokenActor) return;
  yield tokenActor.approve(Principal.fromText('oa67n-laaaa-aaaai-qfm3q-cai'), ethers.utils.parseUnits(amount, 8).toBigInt());

  const responce:TransactionData = yield call(callApi, {
    method: 'POST',
    url: '/save-transaction',
    data: {
      sender: accountId,
      senderType: from,
      amount: ethers.utils.parseUnits(amount, 8).toString(),
      recipient: metamaskAddress,
      recipientType: 'polygon',
    },
  });

  console.log(responce);
  yield put(transactionSetState({
    status: responce.state,
  }));
}

export function* contractApproveSaga({}:ReturnType<typeof contractApprove>) {
  try {
    const { address } = yield select(metamaskSelectors.getState);
    const { accountId } = yield select(plugSelectors.getState);
    const { amount, from } = yield select(transactionSelector.getState);
    if (from === 'plug') {
      yield plugToMetamask(
        address,
        accountId,
        amount,
        from,
      // plugbridgeAddress,
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
