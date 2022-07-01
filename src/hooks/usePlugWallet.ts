import { useSelector } from 'react-redux';
import { plugSelectors } from 'store/plug/selector';

export const usePlugWallet = () => {
  const {
    accountId,
    connected,
    balancePlug,
  } = useSelector(plugSelectors.getState);

  const isPlugConnected = connected;
  const plugAddress = accountId;
  return {
    isPlugConnected,
    plugAddress,
    balancePlug,
  };
};
