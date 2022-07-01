import { fork } from 'redux-saga/effects';
import { transactionSagas } from './contractApproveSaga';
import { transferSagas } from './trnasferSaga';

export const transactonEffects = [
  fork(transactionSagas),
  fork(transferSagas),
];
