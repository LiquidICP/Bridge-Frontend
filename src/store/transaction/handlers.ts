/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFn } from 'types';
import { setReceiving, transactionSetState } from './actionCreator';
import { TransactionActionsType } from './actionTypes';
import { StateTransaction } from './types';

type TransactionStateActionFn<F extends (...args: any) => any> =
ActionFn<StateTransaction, ReturnType<F>>;

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

const setAmount = (state: StateTransaction, { payload }: AmountPayload) => ({
  ...state,
  ...payload,
});

const setFrom = (state: StateTransaction, { payload }: FromPayload) => ({
  ...state,
  ...payload,
});

const setReceivingHandler:TransactionStateActionFn<typeof setReceiving> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setState: TransactionStateActionFn<typeof transactionSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const transactionHandlers = {
  [TransactionActionsType.SET_AMOUNT]: setAmount,
  [TransactionActionsType.SET_FROM]: setFrom,
  [TransactionActionsType.SET_RECEIVING]: setReceivingHandler,
  [TransactionActionsType.SET_STATE]: setState,

};
