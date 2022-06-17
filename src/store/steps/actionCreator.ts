/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';

export const stepsSetState = (payload: any) => ({
  type: StepsActionType.SET_STATE,
  payload,
});

export const stepsIncrement = () => ({
  type: StepsActionType.INCREMENT_STEP,
  // payload: {
  //  step: payload + 1,
  // },
});

export const stepsDecrement = () => ({
  type: StepsActionType.DECREMENT_STEP,
  // payload: {
  //  step: payload - 1,
  // },
});
