import { Balance } from 'utils/plug';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PlugStatus {
  INIT = 'INIT',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  LOST = 'LOST',
  NOT_SUPPORT = 'NOT_SUPPORT',
  LOADING = 'LOADING',
}

export type PlugState = {
  connected: boolean;
  accountId: string;
  publicKey: any;
  balancePlug: Balance[];
  balanceICP:number;
  balanceWICP:number;
  info: unknown | null,
  status:string,
};
