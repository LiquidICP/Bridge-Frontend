/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from 'antd';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { Unwrap } from 'types';
import { sagaExceptionHandler } from 'utils';
import {
  getPlugAccountID,
  getPlugPublicKey,
  plugIsConnect,
  getPlugBalance,
  plugIsInstalled,
} from 'utils/plug';
import { plugConnect, plugSetState } from '../actionsCreator';
import { PlugActionTypes } from '../actionTypes';

export function* connectPlugSaga({}:ReturnType<typeof plugConnect>) {
  try {
    if (!plugIsInstalled()) {
      notification.error({
        message: 'Error',
        description: 'Please install Plug extantion',
      });
      return;
    }
    const accountId: Unwrap<typeof getPlugAccountID> = yield call(getPlugAccountID);

    const publicKey:Unwrap<typeof getPlugPublicKey> = yield call(getPlugPublicKey);
    const balance:Unwrap<typeof getPlugBalance> = yield call(getPlugBalance);
    const isConnectPlug :Unwrap<typeof plugIsConnect> = yield call(plugIsConnect);
    let balanceICP = 0;
    let balanceWICP = 0;
    balance.forEach((b) => {
      if (b.canisterId === 'ryjl3-tyaaa-aaaaa-aaaba-cai') {
        balanceICP = b.amount;
      }
      if (b.canisterId === 'oh7zz-gyaaa-aaaai-qfm3a-cai') {
        balanceWICP = b.amount;
      }
    });
    yield put(plugSetState({
      connected: isConnectPlug,
      publicKey,
      accountId: accountId === false ? undefined : accountId,
      balanceICP,
      balanceWICP,
      balancePlug: balance,
    }));
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* plugSagas() {
  yield takeLatest(PlugActionTypes.CONNECT_PLUG, connectPlugSaga);
}
