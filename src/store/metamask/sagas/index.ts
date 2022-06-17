import { fork } from 'redux-saga/effects';
import { metamaskSagas } from './metamaskSagas';

export const metamaskEffects = [
  fork(metamaskSagas),
];