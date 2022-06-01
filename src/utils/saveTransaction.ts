import { apiBaseUrl } from 'appConstants';
import { RequestSaveTransaction } from 'types/store/saveTransaction';

export async function getResponseSaveTransaction(): Promise<RequestSaveTransaction> {
  const response = await fetch(`${apiBaseUrl}/save-transaction`);
  return response.json();
}
