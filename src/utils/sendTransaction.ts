import { apiBaseUrl } from 'appConstants/api';
import { RequestSaveTransaction } from 'types/store/saveTransaction';

export async function saveTransaction(params: RequestSaveTransaction) {
  const body = JSON.stringify(params);

  const response = await fetch(
    `${apiBaseUrl}/save-transaction`,
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      body,
    },
  );
  return response.json();
}

export async function walletTransactions(wallet: string) {
  const response = await fetch(
    `${apiBaseUrl}/${wallet}/transactions`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  );
  return response.json();
}
