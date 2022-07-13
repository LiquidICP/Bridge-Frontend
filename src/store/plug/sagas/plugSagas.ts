/* eslint-disable no-debugger */
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
import { plugConnect, plugDisConnect, plugSetState } from '../actionsCreator';
import { PlugActionTypes } from '../actionTypes';
import { PlugStatus } from '../types';

export function* connectPlugSaga({}:ReturnType<typeof plugConnect>) {
  try {
    if (plugIsInstalled()) {
      notification.info({
        message: 'Success',
        description: 'Please wait for wallet connection',
      });
      yield put(plugSetState({
        status: PlugStatus.LOADING,
      }));
    } else {
      yield put(plugSetState({
        status: PlugStatus.LOST,
      }));
      notification.error({
        message: 'Error',
        description: 'Please install Plug extension',
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
      status: PlugStatus.CONNECTED,
    }));
  } catch (err) {
    yield put(plugSetState({
      connected: false,
      publicKey: '',
      accountId: '',
      balanceICP: 0,
      balanceWICP: 0,
      balancePlug: [],
      status: PlugStatus.DISCONNECTED,
    }));
    // sagaExceptionHandler(err); ********** old ********
    sagaExceptionHandler('*** State Plug is failed ***');
  }
}

export function* disConnectPlugSaga({}:ReturnType<typeof plugDisConnect>) {
  try {
    yield put(plugSetState({
      connected: false,
      publicKey: '',
      accountId: '',
      balanceICP: 0,
      balanceWICP: 0,
      balancePlug: [],
      status: PlugStatus.DISCONNECTED,
    }));
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* plugSagas() {
  yield takeLatest(PlugActionTypes.CONNECT_PLUG, connectPlugSaga);
  yield takeLatest(PlugActionTypes.DISCONNECT_PLUG, disConnectPlugSaga);
}
