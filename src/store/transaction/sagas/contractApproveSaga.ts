/* eslint-disable no-console */
/* eslint-disable no-empty-pattern */
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
import {
  metamaskbridgeAddress,
  tokenAddress,
  // plugbridgeAddress,
} from '../../../global/constants';
import { contractApprove, transactionSetState } from '../actionCreator';
import { transactionSelector } from '../selector';
import { TransactionActionsType } from '../actionTypes';

function* metamaskToPlug(
  bridgeaddress:string,
  token:string,
  metamaskAddress:string,
  accountId: string,
  amount:string,
  from:string,
) {
  console.log(
    bridgeaddress,
    ethers.utils.parseEther(amount).toString(),
  );
  const contract = getContract();
  const tx:ContractTransaction = yield contract.approve(
    bridgeaddress,
    ethers.utils.parseEther(amount).toString(),
  );
  yield tx.wait();

  const bridgeContract = getBridgeContract();
  const bridgeTx:ContractTransaction = yield bridgeContract.requestBridgingToStart(
    token,
    ethers.utils.parseEther(amount),
  );
  const bridgeData:ContractReceipt = yield bridgeTx.wait();

  const responce:TransactionData = yield call(callApi, {
    method: 'POST',
    url: '/save-transaction',
    data: {
      sender: metamaskAddress,
      senderType: from,
      amount: ethers.utils.parseEther(amount),
      recipient: accountId,
      recipientType: 'dfinity',
      polygonTransactionId: bridgeData.blockHash,
    },
  });

  yield put(transactionSetState({
    status: responce.state,
  }));

  notification.success({
    message: 'Success',
    description: 'Success transaction',
  });
}

// function* plugToMetamask(
//   accountId:string,
//   metamaskAddress:string,
//   amount:string,
//   from: string,
//   plugbridge: string,
// ) {
//   const contract = getContract();
//   if (!contract) return;
//   const tx:ContractTransaction = yield contract.approve({
//     principal: plugbridge,
//     nat: ethers.utils.parseEther(amount),
//   });
//   yield tx.wait();

//   const responce = yield call(callApi, {
//     method: 'POST',
//     payload: {
//       sender: accountId,
//       senderType: from,
//       amount: ethers.utils.parseEther(amount),
//       recipient: metamaskAddress,
//       recipientType: 'polygon',
//     },
//   });
// }

export function* contractApproveSaga({}:ReturnType<typeof contractApprove>) {
  try {
    const { address } = yield select(metamaskSelectors.getState);
    const { accountId } = yield select(plugSelectors.getState);
    const { amount, from } = yield select(transactionSelector.getState);
    if (from === 'plug') {
      // yield plugToMetamask(
      //   address,
      //   accountId,
      //   amount,
      //   from,
      //   plugbridgeAddress,
      // );
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
