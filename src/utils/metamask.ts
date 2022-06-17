import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { MetamaskRequestMethod } from 'store/metamask/types';
import { NetworkName, networkChainIds } from '../global';

export const getMetamaskProvider = async () => {
  const provider = await detectEthereumProvider();
  if (provider != null) {
    return provider as MetaMaskInpageProvider;
  }
  return undefined;
};

export const getAddress = async (): Promise<string | undefined> => {
  const provider = await getMetamaskProvider();
  if (provider) {
    const addresses = await provider.request({
      method: MetamaskRequestMethod.eth_accounts,
    });

    if (addresses != null && typeof addresses === 'object' && Array.isArray(addresses)) {
      return addresses[0];
    }
  }
  return undefined;
};

export const getMetamaskChainId = async (): Promise<string | undefined> => {
  const provider = await getMetamaskProvider();
  if (provider) {
    const chainId = await provider.request({ method: MetamaskRequestMethod.eth_chainId });
    if (chainId && typeof chainId === 'string') {
      return chainId;
    }
  }
  return undefined;
};

export const checkValidationNetwork = async (id?: string) => {
  let chainId: string | undefined = id;
  if (!chainId) {
    chainId = await getMetamaskChainId();
  }
  const networkIds = Object.values(networkChainIds);
  if (!chainId) return false;
  return networkIds.includes(chainId);
};

export const getIsMetamaskInstalled = async () => {
  const provider = await getMetamaskProvider();
  return provider !== undefined && provider.isMetaMask;
};

export const getNetworkById = (chainId?: string): NetworkName | null => {
  const target = (Object.keys(networkChainIds) as NetworkName[]).find((key) =>
    networkChainIds[key] === chainId);
  return target || null;
};
