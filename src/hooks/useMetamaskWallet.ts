import { useSelector } from 'react-redux';
import { metamaskSelectors } from 'store/metamask/selectors';
import { MetamaskStatus } from 'store/metamask/types';

export const useMetamaskWallet = () => {
  const {
    status,
    address,
  } = useSelector(metamaskSelectors.getState);

  const isMetaMaskConnected = status === MetamaskStatus.CONNECTED && address !== undefined;
  const metamaskAddress = address;
  return {
    isMetaMaskConnected,
    status,
    metamaskAddress,
  };
};
