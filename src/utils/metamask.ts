/* eslint-disable @typescript-eslint/no-explicit-any */
import detectEthereumProvider from '@metamask/detect-provider';

declare let window: any;

export type Provider = any;

export async function metamaskIsInstalled() {
  const provider: Provider = await detectEthereumProvider();
  return !(!provider || !provider.isMetaMask);
}

export async function getAccountMetamask() {
  const provider: Provider = await detectEthereumProvider();
  const accounts = await provider.request({
    method: 'eth_requestAccounts',
  });
  return {
    account: accounts[0],
    provider,
  };
}

export async function getBalanceMetamask() {
  const { account, provider } = await getAccountMetamask();
  const balance = await provider.request({
    method: 'eth_getBalance',
    params: [
      account,
      'latest',
    ],
  });
  return balance;
}

export function isConnectedMetamask() {
  const isConnected = window?.ethereum?.isConnected();
  return isConnected;
}
