/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';
import { StepsStateType } from './types';

const setState = (state: StepsStateType, { payload }: any) => ({
  ...state,
  ...payload,
});

const increment = (state: StepsStateType) => ({
  ...state,
  step: state.step + 1,
});

const decrement = (state: StepsStateType) => ({
  ...state,
  step: state.step - 1,
});

export const stepsHandlers = {
  [StepsActionType.SET_STATE]: setState,
  [StepsActionType.INCREMENT_STEP]: increment,
  [StepsActionType.DECREMENT_STEP]: decrement,
};
