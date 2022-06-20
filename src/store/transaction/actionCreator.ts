import { TransactionActionsType } from './actionTypes';
import { initialStateTransaction } from './state';

export function initTransactionState() {
  return {
    type: TransactionActionsType.INITIAL_STATE_TRANSACTION,
    payload: {
      ...initialStateTransaction,
    },
  };
}

export function setAmount(amount: number | string) {
  return {
    type: TransactionActionsType.SET_AMOUNT,
    payload: {
      amount,
    },
  };
}

export function setFrom(from: 'polygon' | 'plug') {
  return {
    type: TransactionActionsType.SET_FROM,
    payload: {
      from,
    },
  };
}

export function getAmount() {
  return {
    type: TransactionActionsType.GET_AMOUNT,
  };
}

export function getFrom() {
  return {
    type: TransactionActionsType.GET_FROM,
  };
}

export function setReceiving(receiving: number | string) {
  return {
    type: TransactionActionsType.SET_RECEIVING,
    payload: {
      receiving,
    },
  };
}

export const contractApprove = () => ({
  type: TransactionActionsType.APPROVE,
});
