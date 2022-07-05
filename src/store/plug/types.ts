import { Balance } from 'utils/plug';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PlugState = {
  connected: boolean;
  accountId: string;
  publicKey: any;
  balancePlug: Balance[];
  balanceICP:number;
  balanceWICP:number;
  info: unknown | null,
};
