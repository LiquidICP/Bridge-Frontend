/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';
import { StepsStateType } from './types';

const setState = (state: StepsStateType, { payload }: any) => ({
  ...state,
  ...payload,
});

const increment = (state: StepsStateType) => {
  let step = 1;
  if (state.step === 3) {
    step = 0;
  }
  return {
    ...state,
    step: state.step + step,
  };
};

const decrement = (state: StepsStateType) => {
  let step = 0;
  if (state.step > 1) {
    step = -1;
  }
  return {
    ...state,
    step: state.step + step,
  };
};

const stepToStart = (state: StepsStateType) => ({
  ...state,
  step: 1,
});

export const stepsHandlers = {
  [StepsActionType.SET_STATE]: setState,
  [StepsActionType.INCREMENT_STEP]: increment,
  [StepsActionType.DECREMENT_STEP]: decrement,
  [StepsActionType.STEP_TO_START]: stepToStart,
};
