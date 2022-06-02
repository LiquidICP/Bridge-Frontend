import { apiBaseUrl } from 'appConstants';
import { RequestSaveTransaction } from 'types/store/saveTransaction';
import { ApiEndpoint } from './constants';

const url = apiBaseUrl + ApiEndpoint.saveTransaction;

async function postFetch(params: RequestSaveTransaction) {
  const body = JSON.stringify(params);
  console.log(body);

  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      body,
    });
    const response = await res.json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export { postFetch };
