import type { MetamaskState } from './types';
import type { ReduxState } from '../types';

export const metamaskSelectors = {
  getProp: <T extends keyof MetamaskState>(propKey: T) => (state: ReduxState) =>
    state.metamask[propKey],
  getState: (state: ReduxState) => state.metamask,
};
