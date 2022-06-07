import { fork } from 'redux-saga/effects';
import { getAccountsMetamask } from './metamask/saga';

export default function* rootSaga() {
  yield fork(getAccountsMetamask);
}
