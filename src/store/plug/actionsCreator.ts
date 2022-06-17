import { PlugActionTypes } from './actionTypes';
import { PlugState } from './types';

export const plugSetState = (payload: Partial<PlugState>) => ({
  type: PlugActionTypes.SET_STATE,
  payload,
});

export const plugConnect = () => ({
  type: PlugActionTypes.CONNECT_PLUG,
});
