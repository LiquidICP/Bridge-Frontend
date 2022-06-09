import { combineReducers } from 'redux';
import { metamaskReducer } from './metamask/reducer';
import { plugReducer } from './plug/reducer';

const rootReducer = combineReducers({
  metamask: metamaskReducer,
  plug: plugReducer,
});

export default { rootReducer };
