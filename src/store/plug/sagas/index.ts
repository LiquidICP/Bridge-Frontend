import { fork } from 'redux-saga/effects';
import { plugSagas } from './plugSagas';

export const plugEffects = [
  fork(plugSagas),
];
