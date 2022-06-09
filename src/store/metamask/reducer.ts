import { ActionMetamask } from 'types/store/metamask';
import { ActionsMetamask } from './constants';
import { initialMetamaskState } from './state';

// eslint-disable-next-line @typescript-eslint/default-param-last
function metamaskReducer(state = initialMetamaskState, action: ActionMetamask) {
  switch (action.type) {
    case ActionsMetamask.CONNECT_METAMASK:
      return {
        ...state,
        address: action.payload.address,
        balance: action.payload.balance,
      };
    case ActionsMetamask.INITIAL_STATE:
      return {
        ...action.payload,
      };
    default: return state;
  }
}

export { metamaskReducer };
