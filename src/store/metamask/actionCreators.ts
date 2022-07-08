import {
  MetamaskState,
} from './types';
import {
  MetamaskActionType,
} from './actionTypes';

export const metamaskSetState = (payload: Partial<MetamaskState>) => ({
  type: MetamaskActionType.SET_STATE,
  payload,
});

export const metamaskOnAppMount = () => ({
  type: MetamaskActionType.ON_APP_MOUNT,
});

export const metamaskConnect = () => ({
  type: MetamaskActionType.CONNECT,
});

export const metamaskDisconnect = () => ({
  type: MetamaskActionType.DISCONNECT,
});

export const metamaskGetTokensBalance = () => ({
  type: MetamaskActionType.GET_TOKENS_BALANCE,
});
