export type StateTransaction = {
  amount: number | string,
  from: 'polygon' | 'plug',
  fee: number,
  feePercent: number,
  receiving: number | string,
  status: string,
  transferAmount:string,
};

export type TransferPLUG = {
  height:number
};
