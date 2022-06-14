/* eslint-disable no-console */
import { getPlugAccountID, getPlugPublicKey, plugIsConnect } from 'utils/plug';
import { ActionsPlug } from './constants';
import { initialStatePlug } from './state';

export async function getAccountId() {
  const accountId = await getPlugAccountID();
  console.log('Plug account ID:', accountId);

  return {
    type: ActionsPlug.GET_ACCOUNT_ID_PLUG,
    payload: {
      accountId,
    },
  };
}

export async function connectPlug() {
  const publicKey = await getPlugPublicKey();
  const accountID = await getPlugAccountID();

  return {
    type: ActionsPlug.CONNECT_PLUG,
    payload: {
      publicKey,
      connected: true,
      accountId: accountID,
    },
  };
}

export function getBalance() {
  return {
    type: ActionsPlug.GET_BALANCE_PLUG,
    payload: {
      balance: '',
    },
  };
}

export function isConnectPlug() {
  const isConnected = plugIsConnect();

  return {
    type: ActionsPlug.IS_CONNECT_PLUG,
    payload: {
      connected: isConnected,
    },
  };
}

export function initStatePlug() {
  return {
    type: ActionsPlug.INITIAL_STATE_PLUG,
    payload: {
      ...initialStatePlug,
    },
  };
}
