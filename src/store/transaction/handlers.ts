/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionActionsType } from './actionTypes';
import { StateTransaction } from './types';

type AmountPayload = {
  payload: {
    amount: string | number;
  }
};

type FromPayload = {
  payload: {
    from: 'plug' | 'polygon';
  }
};

type ReceivingPayload = {
  payload: {
    receiving: string | number;
  }
};

const setAmount = (state: StateTransaction, { payload }: AmountPayload) => ({
  ...state,
  ...payload,
});

const setFrom = (state: StateTransaction, { payload }: FromPayload) => ({
  ...state,
  ...payload,
});

const setReceiving = (state: StateTransaction, { payload }: ReceivingPayload) => ({
  ...state,
  ...payload,
});

export const transactionHandlers = {
  [TransactionActionsType.SET_AMOUNT]: setAmount,
  [TransactionActionsType.SET_FROM]: setFrom,
  [TransactionActionsType.SET_RECEIVING]: setReceiving,
};
