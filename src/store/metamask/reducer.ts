import { CONNECT_METAMASK } from 'appConstants';
import { MetamaskActions, MetamaskState } from 'types/store/metamask';

function metamaskReducer(state: MetamaskState, action: MetamaskActions) {
  switch (action.type) {
    case CONNECT_METAMASK:
      return { ...state, address: action.payload.address };
    default: return state;
  }
}

export { metamaskReducer };
