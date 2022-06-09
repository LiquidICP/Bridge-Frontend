import { State } from 'types/store';

export function getMetamaskState(state: State) {
  return state.rootReducer.metamask;
}
