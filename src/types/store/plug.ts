/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionPlug = {
  type: string;
  payload: Record<string, any>;
};

export type StatePlug = {
  connected: boolean;
  accountId: string;
  publicKey: [];
  balance: 0;
  info: unknown | null,
};
