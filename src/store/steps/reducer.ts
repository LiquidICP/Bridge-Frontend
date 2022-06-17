/* eslint-disable @typescript-eslint/default-param-last */
import { ActionStep, StepsState } from 'types/store/steps';
import { ActionsSteps } from './constants';
import { initialSteps } from './state';

function stepsReducer(state: StepsState = initialSteps, action: ActionStep) {
  switch (action.type) {
    case ActionsSteps.INITIAL_STEP:
      return {
        ...state,
      };
    case ActionsSteps.INCREMENT_STEP:
      return {
        step: state.step + 1,
      };
    case ActionsSteps.DECREMENT_STEP:
      return {
        step: state.step - 1,
      };
    default: return state;
  }
}

export { stepsReducer };
