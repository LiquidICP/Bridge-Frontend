/* eslint-disable @typescript-eslint/default-param-last */
import { createReducer } from 'utils';
import { stepsHandlers } from './handlers';

export const stepsInitialState = {
  step: 1,
};

export default createReducer(stepsInitialState, stepsHandlers);
