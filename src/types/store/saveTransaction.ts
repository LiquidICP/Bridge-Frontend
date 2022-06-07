export type RequestSaveTransaction = {
  id: number,
  sender: string,
  senderType?: Record<string, unknown>,
  amount: string,
  recipient: string,
  recipientType?: Record<string, unknown>,
  state?: Record<string, unknown>,
  polygonTransactionId: string,
};
