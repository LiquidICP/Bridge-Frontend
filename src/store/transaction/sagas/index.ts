import { fork } from 'redux-saga/effects';
import { transactionSagas } from './contractApproveSaga';

export const transactonEffects = [
  fork(transactionSagas),
];
