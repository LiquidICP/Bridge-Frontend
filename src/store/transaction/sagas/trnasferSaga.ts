/* eslint-disable no-empty-pattern */
import { Principal } from '@dfinity/principal';
import SERVICE, { SuccesTxReceipt, Tokens } from 'abi/dfinityToken/types';
import { notification } from 'antd';
import { getDfinityContract } from 'api/dfinityContract';
import { ethers } from 'ethers';
import { takeLatest } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import { plugbridgeAddressApproveWICP } from '../../../global/constants';
import { transferWICPToICP } from '../actionCreator';
import { TransactionActionsType } from '../actionTypes';

export function* transferApproveSaga({ payload: { amount } }:ReturnType<typeof transferWICPToICP>) {
  try {
    const tokenActor:SERVICE = yield getDfinityContract();
    yield tokenActor.approve(
      Principal.fromText(plugbridgeAddressApproveWICP),
      ethers.utils.parseUnits(amount, 8).toBigInt(),
    );
    notification.info({
      message: 'INFO',
      description: 'Please wait transfer WICP to ICP',
      duration: 15,
    });
    const balanceICP:Tokens = yield tokenActor.canisterBalanceICP();

    if ((Number(balanceICP.e8s) - 10001) >= (Number(amount) * 10 ** 8)) {
      const unwrappedWICP:SuccesTxReceipt = yield tokenActor.unwrappedWICP(
        ethers.utils.parseUnits(amount, 8).toBigInt(),
      );
      if (unwrappedWICP.Ok) {
        notification.info({
          message: 'INFO',
          description: 'Unwrapping success',
          duration: 15,
        });
      }
    } else {
      return;
    }
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* transferSagas() {
  yield takeLatest(TransactionActionsType.TRANSFERWICPToICP, transferApproveSaga);
}
