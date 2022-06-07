export type MetamaskState = {
  address: string | null | undefined,
};

export type MetamaskActions = {
  type: string,
  payload: Record<string, unknown>,
};
