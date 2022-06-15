import { ActionsSteps } from './constants';

export function incrementStep() {
  return {
    type: ActionsSteps.INCREMENT_STEP,
  };
}

export function decrementStep() {
  return {
    type: ActionsSteps.DECREMENT_STEP,
  };
}

export function initStep() {
  return {
    type: ActionsSteps.INITIAL_STEP,
  };
}
