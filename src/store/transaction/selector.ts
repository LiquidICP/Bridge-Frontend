import { State } from 'types/store';

export function getTransactionState(state: State) {
  return state.rootReducer.transaction;
}
