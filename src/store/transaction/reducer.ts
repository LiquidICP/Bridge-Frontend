/* eslint-disable @typescript-eslint/default-param-last */
import { createReducer } from 'utils';
import { transactionHandlers } from './handlers';
import { initialStateTransaction } from './state';

export default createReducer(initialStateTransaction, transactionHandlers);
