import type { ReduxState } from '../types';
import { PlugState } from './types';

export const plugSelectors = {
  getProp: <T extends keyof PlugState>(propKey: T) => (state: ReduxState) =>
    state.plug[propKey],
  getState: (state: ReduxState) => state.plug,
};
