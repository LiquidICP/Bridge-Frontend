/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';
import { StepesStateType } from './types';

const setState = (state: StepesStateType, { payload }: any) => ({
  ...state,
  ...payload,
});

const increment = (state: StepesStateType) => ({
  ...state,
  step: state.step + 1,
});

const decrement = (state: StepesStateType) => ({
  ...state,
  step: state.step - 1,
});

export const stepsHandlers = {
  [StepsActionType.SET_STATE]: setState,
  [StepsActionType.INCREMENT_STEP]: increment,
  [StepsActionType.DECREMENT_STEP]: decrement,
};
