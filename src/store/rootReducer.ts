// import { combineReducers } from 'redux';
import metamask from 'store/metamask/reducer';
import plug from 'store/plug/reducer';
import steps from './steps/reducer';
import transaction from './transaction/reducer';

// const rootReducer = combineReducers({});

export default {
  metamask, plug, steps, transaction,
};
