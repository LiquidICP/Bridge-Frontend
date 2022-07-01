/* eslint-disable no-empty-pattern */
import { Principal } from '@dfinity/principal';
import { SERVICE } from 'abi/dfinityToken/types';
import { notification } from 'antd';
import { getDfinityContract } from 'api/dfinityContract';
import { ethers } from 'ethers';
import { call, select, takeLatest } from 'redux-saga/effects';
import { plugSelectors } from 'store/plug/selector';
import { sagaExceptionHandler } from 'utils';
import { callApi } from 'utils/api';
import { plugbridgeAddress } from '../../../global/constants';
import { transferWICPToICP } from '../actionCreator';
import { TransactionActionsType } from '../actionTypes';

export function* transferApproveSaga({ payload: { amount } }:ReturnType<typeof transferWICPToICP>) {
  try {
    const { accountId } = yield select(plugSelectors.getState);
    const tokenActor:SERVICE = yield getDfinityContract();
    yield tokenActor.approve(
      Principal.fromText(plugbridgeAddress),
      ethers.utils.parseUnits(amount, 8).toBigInt(),
    );
    notification.info({
      message: 'INFO',
      description: 'Please wait Transaction',
    });
    yield call(callApi, {
      method: 'POST',
      url: '/unwrapped-wicp',
      data: {
        uAddress: accountId,
        amount: Number(ethers.utils.parseUnits(amount, 8).toString()),
      },
    });
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* transferSagas() {
  yield takeLatest(TransactionActionsType.TRANSFERWICPToICP, transferApproveSaga);
}
