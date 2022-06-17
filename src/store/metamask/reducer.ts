import { createReducer } from 'utils';
import { MetamaskState, MetamaskStatus } from './types';
import { metamaskHandlers } from './handlers';

export const metamaskInitialState: Readonly<MetamaskState> = {
  isTokensBalanceLoading: false,
  address: undefined,
  status: MetamaskStatus.INIT,
  balance: 0,
  network: null,

  tokensBalance: undefined,
};

export default createReducer(metamaskInitialState, metamaskHandlers);
