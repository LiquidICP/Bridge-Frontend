/* eslint-disable @typescript-eslint/no-explicit-any */
export type PlugState = {
  connected: boolean;
  accountId: string;
  publicKey: any;
  balancePlug: number;
  info: unknown | null,
};
