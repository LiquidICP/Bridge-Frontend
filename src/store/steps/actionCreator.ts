/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepsActionType } from './actionTypes';

export const stepsSetState = (payload: any) => ({
  type: StepsActionType.SET_STATE,
  payload,
});

export const stepsIncrement = (payload: any) => ({
  type: StepsActionType.INCREMENT_STEP,
  payload: {
    step: payload + 1,
  },
});
