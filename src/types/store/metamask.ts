/* eslint-disable @typescript-eslint/no-explicit-any */
export type StateMetamask = {
  address: string,
  balance: number | string | undefined,
  connected: boolean,
  networkVersion: string,
  chainId: string,
  selectedAddress: string,
};

export type ActionMetamask = {
  type: string,
  payload: Record<string, any>,
};
