import { fork } from 'redux-saga/effects';
import { balanceSagas } from './balanceSagas';
import { metamaskSagas } from './metamaskSagas';

export const metamaskEffects = [
  fork(metamaskSagas),
  fork(balanceSagas),
];
