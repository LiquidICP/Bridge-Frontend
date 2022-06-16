import metamask from 'store/metamask/reducer';
import { plugReducer } from './plug/reducer';
import { stepsReducer } from './steps/reducer';
import { transactionReduser } from './transaction/reducer';

export default {
  metamask,
  plug: plugReducer,
  transaction: transactionReduser,
  steps: stepsReducer,
};
