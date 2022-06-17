/* eslint-disable @typescript-eslint/no-explicit-any */
export type StateTransaction = {
  amount: number | string,
  from: 'polygon' | 'plug',
  fee: number,
  receiving: number | string,
};

export type ActionTransaction = {
  type: string,
  payload: Record<string, any>,
};
