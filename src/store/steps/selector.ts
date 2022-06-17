import { ReduxState } from 'store/types';
import { StepsStateType } from './types';

export const StepsSelector = {
  getProp: <T extends keyof StepsStateType>(propKey: T) =>
    (state: ReduxState) => state.steps[propKey],
  getState: (state: ReduxState) => state.steps,
};
