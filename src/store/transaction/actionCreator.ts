import { ActionsTransaction } from './constants';
import { initialStateTransaction } from './state';

export function initTransactionState() {
  return {
    type: ActionsTransaction.INITIAL_STATE_TRANSACTION,
    payload: {
      ...initialStateTransaction,
    },
  };
}

export function setAmount(amount: number | string) {
  return {
    type: ActionsTransaction.SET_AMOUNT,
    payload: {
      amount,
    },
  };
}

export function setFrom(from: 'polygon' | 'plug') {
  return {
    type: ActionsTransaction.SET_FROM,
    payload: {
      from,
    },
  };
}

export function getAmount() {
  return {
    type: ActionsTransaction.GET_AMOUNT,
  };
}

export function getFrom() {
  return {
    type: ActionsTransaction.GET_FROM,
  };
}

export function setReceiving(receiving: number | string) {
  return {
    type: ActionsTransaction.SET_RECEIVING,
    payload: {
      receiving,
    },
  };
}
