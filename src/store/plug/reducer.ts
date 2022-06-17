import { createReducer } from 'utils';
import { plugHandlers } from './handlers';
import { PlugState } from './types';

export const plugInitialState: Readonly<PlugState> = {
  connected: false,
  accountId: '',
  balance: 0,
  publicKey: [],
  info: null,
};

export default createReducer(plugInitialState, plugHandlers);
