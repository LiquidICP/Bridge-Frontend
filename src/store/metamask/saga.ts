import { CONNECT_METAMASK } from 'appConstants';
import { put } from 'redux-saga/effects';
import { metamaskConnect } from 'utils/metamask';

export function* getAccountsMetamask() {
  try {
    const payload = metamaskConnect();
    yield put({
      type: CONNECT_METAMASK,
      payload,
    });
  } catch (error) {
    return error;
  }
}
