/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action as ActionRedux } from 'redux';
import { MetamaskState } from 'store/metamask/types';
import { StatePlug } from 'types/store/plug';

export type ReduxState = {
  metamask: MetamaskState,
  plug:StatePlug,
};

export type ActionFn<T, U> = (
  state: Readonly<T>,
  action: ActionRedux<string> & U
) => Readonly<T>;

export type Unwrap<T> = T extends (...args: any) => Promise<any>
  ? T extends (...args: any) => Promise<infer U> ? U : T
  : T extends () => Iterator<any, infer U, any> ? U : any;
