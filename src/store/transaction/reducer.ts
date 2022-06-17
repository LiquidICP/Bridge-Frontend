/* eslint-disable @typescript-eslint/default-param-last */
import { ActionTransaction, StateTransaction } from 'types/store/transaction';
import { ActionsTransaction } from './constants';
import { initialStateTransaction } from './state';

function transactionReduser(
  state: StateTransaction = initialStateTransaction,
  action: ActionTransaction,
) {
  switch (action.type) {
    case ActionsTransaction.INITIAL_STATE_TRANSACTION:
      return {
        ...state,
      };
    case ActionsTransaction.SET_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount,
      };
    case ActionsTransaction.SET_FROM:
      return {
        ...state,
        from: action.payload.from,
      };
    case ActionsTransaction.SET_RECEIVING:
      return {
        ...state,
        receiving: action.payload.receiving,
      };
    default: return state;
  }
}

export { transactionReduser };
