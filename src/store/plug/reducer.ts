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
      };
    case ActionsPlug.GET_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.payload.accountID,
      };
    default: return state;
  }
}

export { plugReducer };
