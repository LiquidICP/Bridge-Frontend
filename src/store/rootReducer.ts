import { combineReducers } from 'redux';
import metamask from 'store/metamask/reducer';
import { plugReducer } from './plug/reducer';
import steps from './steps/reducer';
import { transactionReduser } from './transaction/reducer';

const rootReducer = combineReducers({
  transaction: transactionReduser,
});

export default {
  rootReducer, metamask, plug: plugReducer, steps,
};
