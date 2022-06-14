import { ActionMetamask } from 'types/store/metamask';
import { ActionsMetamask } from './constants';
import { initialMetamaskState } from './state';

// eslint-disable-next-line @typescript-eslint/default-param-last
function metamaskReducer(state = initialMetamaskState, action: ActionMetamask) {
  switch (action.type) {
    case ActionsMetamask.CONNECT_METAMASK:
      return {
        ...state,
        ...action.payload,
      };
    case ActionsMetamask.INITIAL_STATE_METAMASK:
      return {
        ...state,
      };
    case ActionsMetamask.IS_CONNECTED_METAMASK:
      return {
        ...state,
        connected: action.payload.connected,
      };
    case ActionsMetamask.SET_ADDRESS_METAMASK:
      return {
        ...state,
        address: action.payload.address,
      };
    case ActionsMetamask.GET_ACCOUNT_INFO_METAMASK:
      return {
        ...state,
        ...action.payload,
      };
    default: return state;
  }
}

export { metamaskReducer };
