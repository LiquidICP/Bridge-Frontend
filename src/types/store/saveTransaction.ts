export type RequestSaveTransaction = {
  id: number,
  sender: string,
  senderType: Record<string, unknown> | undefined,
  amount: string,
  recipient: string,
  recipientType: Record<string, unknown> | undefined,
  state: Record<string, unknown> | undefined,
  polygonTransactionId: string,
};
