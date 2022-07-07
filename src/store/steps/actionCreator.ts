/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';

export const stepsSetState = (payload: any) => ({
  type: StepsActionType.SET_STATE,
  payload,
});

export const stepsIncrement = () => ({
  type: StepsActionType.INCREMENT_STEP,
});

export const stepsDecrement = () => ({
  type: StepsActionType.DECREMENT_STEP,
});

export const stepToStart = () => ({
  type: StepsActionType.STEP_TO_START,
});
