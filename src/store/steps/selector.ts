import { State } from 'types';

export function getStepsState(state: State) {
  return state.rootReducer.steps;
}
