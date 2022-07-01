import { createReducer } from 'utils';
import { plugHandlers } from './handlers';
import { PlugState } from './types';

export const plugInitialState: Readonly<PlugState> = {
  connected: false,
  accountId: '',
  balancePlug: [],
  balanceICP: 0,
  balanceWICP: 0,
  publicKey: [],
  info: null,
};

export default createReducer(plugInitialState, plugHandlers);
