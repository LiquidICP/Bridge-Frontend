/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccountMetamask, getBalanceMetamask, isConnectedMetamask } from 'utils/metamask';
import { ActionsMetamask } from './constants';
import { initialMetamaskState } from './state';

export type ActionMetamask = {
  type: string;
  playload?: Record<string, any>;
};

export function setAddress(address: string) {
  return {
    type: ActionsMetamask.GET_ADDRESS,
    payload: {
      address,
    },
  };
}

export async function connectMetamask() {
  const address = await getAccountMetamask();
  const balance = await getBalanceMetamask();

  return {
    type: ActionsMetamask.CONNECT_METAMASK,
    payload: {
      address: address.account,
      balance,
      connected: true,
    },
  };
}

export function isConnectMetamask() {
  const connected = isConnectedMetamask();

  return {
    type: ActionsMetamask.IS_CONNECTED,
    payload: {
      connected,
    },
  };
}

export function initStateMetamask() {
  return {
    type: ActionsMetamask.INITIAL_STATE,
    payload: {
      ...initialMetamaskState,
    },
  };
}
