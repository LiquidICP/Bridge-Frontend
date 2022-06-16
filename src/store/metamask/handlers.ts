import { ActionFn } from 'types';
import { MetamaskState } from './types';
import { MetamaskActionType } from './actionTypes';
import { metamaskSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetaMaskStateActionFn<F extends (...args: any) => any> =
ActionFn<MetamaskState, ReturnType<F>>;

const setState: MetaMaskStateActionFn<typeof metamaskSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const metamaskHandlers = {
  [MetamaskActionType.SET_STATE]: setState,
};
