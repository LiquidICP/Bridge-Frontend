import { StatePlug } from 'types/store/plug';
import type { ReduxState } from '../types';

export const plugSelectors = {
  getProp: <T extends keyof StatePlug>(propKey: T) => (state: ReduxState) =>
    state.plug[propKey],
  getState: (state: ReduxState) => state.plug,
};
