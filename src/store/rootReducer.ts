import { combineReducers } from 'redux';
import metamask from 'store/metamask/reducer';
import { plugReducer } from './plug/reducer';
import { stepsReducer } from './steps/reducer';
import { transactionReduser } from './transaction/reducer';

const rootReducer = combineReducers({
  transaction: transactionReduser,
  steps: stepsReducer,
});

export default { rootReducer, metamask, plug: plugReducer };
