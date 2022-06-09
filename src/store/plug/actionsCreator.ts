import { getPlugAccountID, getPlugPublicKey, plugIsConnect } from 'utils/plug';
import { ActionsPlug } from './constants';
import { initialStatePlug } from './state';

export async function getAccountId() {
  const accountId = await getPlugAccountID();

  return {
    type: ActionsPlug.GET_ACCOUNT_ID,
    payload: {
      accountId,
    },
  };
}

export async function connectPlug() {
  const publicKey = await getPlugPublicKey();

  return {
    type: ActionsPlug.CONNECT_PLUG,
    payload: {
      publicKey,
      isConnected: true,
    },
  };
}

export function getBalance() {
  return {
    type: ActionsPlug.GET_BALANCE,
    payload: {
      balance: '',
    },
  };
}

export function isConnectPlug() {
  const isConnected = plugIsConnect();

  return {
    type: ActionsPlug.IS_CONNECT,
    payload: {
      isConnected,
    },
  };
}

export function initStatePlug() {
  return {
    type: ActionsPlug.INITIAL_STATE,
    payload: {
      ...initialStatePlug,
    },
  };
}
