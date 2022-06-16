import { all } from 'redux-saga/effects';
import { metamaskEffects } from './metamask/sagas';

export default function* rootSaga() {
  yield all([
    ...metamaskEffects,
  ]);
}
