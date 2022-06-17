import { ActionFn } from '../types';
import { plugSetState } from './actionsCreator';
import { PlugActionTypes } from './actionTypes';
import { PlugState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlugStateActionFn<F extends (...args: any) => any> =
ActionFn<PlugState, ReturnType<F>>;

const setState: PlugStateActionFn<typeof plugSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const plugHandlers = {
  [PlugActionTypes.SET_STATE]: setState,
};
