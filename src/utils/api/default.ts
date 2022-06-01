/* eslint-disable no-console */
import { apiBaseUrl } from 'appConstants';
import { createDefaultUrl } from './createUrl';

async function getDefault(address: string) {
  const url = apiBaseUrl + createDefaultUrl(address);
  
  const res = await fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Allow-Origin': '*',
    },
  });
  console.log(res);
  return res;
}

export { getDefault };
