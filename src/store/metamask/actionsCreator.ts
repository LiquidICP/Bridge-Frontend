/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { StateMetamask } from 'types/store/metamask';
import {
  getAccountMetamask, getBalanceMetamask, isConnectedMetamask,
} from 'utils/metamask';
import { ActionsMetamask } from './constants';
// import { initialMetamaskState } from './state';

export type ActionMetamask = {
  type: string;
  playload?: Record<string, any>;
};

export async function getAccountInfoMetamask() {
  const info = await getAccountMetamask();
  const balance = await getBalanceMetamask();

  return {
    type: ActionsMetamask.GET_ACCOUNT_INFO_METAMASK,
    payload: {
      address: info.account,
      networkVersion: info.provider.networkVersion,
      selectedAddress: info.provider.selectedAddress,
      chainId: info.provider.chainId,
      balance,
    },
  };
}

export async function setAddress() {
  const address = await getAccountMetamask();

  return {
    type: ActionsMetamask.SET_ADDRESS_METAMASK,
    payload: {
      address: address.account,
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
      networkVersion: address.provider.networkVersion,
      selectedAddress: address.provider.selectedAddress,
      chainId: address.provider.chainId,
      balance,
      connected: true,
    },
  };
}

export async function isConnectMetamask() {
  const connected = await isConnectedMetamask();

  return {
    type: ActionsMetamask.IS_CONNECTED_METAMASK,
    payload: {
      connected,
    },
  };
}

export function initStateMetamask() {
  return {
    type: ActionsMetamask.INITIAL_STATE_METAMASK,
  };
}
