import { all } from 'redux-saga/effects';
import { metamaskEffects } from './metamask/sagas';
import { plugEffects } from './plug/sagas';
import { transactonEffects } from './transaction/sagas';

export default function* rootSaga() {
  yield all([
    ...metamaskEffects,
    ...plugEffects,
    ...transactonEffects,
  ]);
}
