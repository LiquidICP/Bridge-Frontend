import { ReduxState } from 'store/types';
import { State } from 'types';
import { StepesStateType } from './types';

export const StepesSelector = {
  getProp: <T extends keyof StepesStateType>(propKey: T) =>
    (state: ReduxState) => state.steps[propKey],
  getState: (state: ReduxState) => state.steps,
};

export function getStepsState(state: State) {
  return state.rootReducer.steps;
}
