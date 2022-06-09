import { State } from 'types/store';

export function getPlugState(state: State) {
  return state.rootReducer.plug;
}
