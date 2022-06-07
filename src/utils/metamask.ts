import detectEthereumProvider from '@metamask/detect-provider';

export type Provider = any;

export const metamaskIsInstalled = async () => {
  const ethProvider: Provider = await detectEthereumProvider();
  return !(!ethProvider || !ethProvider.isMetaMask);
};

export const metamaskConnect = async () => {
  const provider: Provider = await detectEthereumProvider();
  const accounts = await provider.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
};
