import { createReducer } from 'utils';
import { plugHandlers } from './handlers';
import { PlugState, PlugStatus } from './types';

export const plugInitialState: Readonly<PlugState> = {
  connected: false,
  accountId: '',
  balancePlug: [],
  balanceICP: 0,
  balanceWICP: 0,
  publicKey: [],
  info: null,
  status: PlugStatus.INIT,
};

export default createReducer(plugInitialState, plugHandlers);
