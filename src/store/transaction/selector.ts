import { ReduxState } from 'store/types';
import { StateTransaction } from './types';

export const transactionSelector = {
  getProp: <T extends keyof StateTransaction>(propKey: T) =>
    (state: ReduxState) => state.transaction[propKey],
  getState: (state: ReduxState) => state.transaction,
};
