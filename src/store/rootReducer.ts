import { combineReducers } from 'redux';
import { metamaskReducer } from './metamask/reducer';
import { plugReducer } from './plug/reducer';
import { stepsReducer } from './steps/reducer';
import { transactionReduser } from './transaction/reducer';

const rootReducer = combineReducers({
  metamask: metamaskReducer,
  plug: plugReducer,
  transaction: transactionReduser,
  steps: stepsReducer,
});

export default { rootReducer };
