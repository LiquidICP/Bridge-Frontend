export type StateTransaction = {
  amount: number | string,
  from: 'polygon' | 'plug',
  fee: number,
  receiving: number | string,
  status: string,
  transferAmount:string,
};
