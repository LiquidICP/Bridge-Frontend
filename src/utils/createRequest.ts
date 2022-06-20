export function createRequest(
  sender: string,
  senderType: 'dfinity' | 'polygon',
  amount: string,
  recipient: string,
  polygonTransactionId: string | undefined,
) {
  let recipientType = 'dfinity';

  if (senderType === 'dfinity') {
    recipientType = 'polygon';
  }

  return {
    sender,
    senderType,
    amount,
    recipient,
    recipientType,
    polygonTransactionId,
  };
}
