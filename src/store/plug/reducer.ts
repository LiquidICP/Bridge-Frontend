/* eslint-disable no-console */
import { ActionPlug } from 'types/store/plug';
import { ActionsPlug } from './constants';
import { initialStatePlug } from './state';

// eslint-disable-next-line @typescript-eslint/default-param-last
function plugReducer(state = initialStatePlug, action: ActionPlug) {
  switch (action.type) {
    case ActionsPlug.CONNECT_PLUG:
      return {
        ...state,
        publicKey: action.payload.publicKey,
        accountId: action.payload.accountId,
        connected: action.payload.connected,
      };
    case ActionsPlug.GET_ACCOUNT_ID_PLUG:
      return {
        ...state,
        ...action.payload,
      };
    case ActionsPlug.INITIAL_STATE_PLUG: {
      return {
        ...state,
      };
    }
    case ActionsPlug.IS_CONNECT_PLUG: {
      return {
        ...state,
        connected: action.payload.connected,
      };
    }
    default: return state;
  }
}

export { plugReducer };
