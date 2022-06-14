import { StateMetamask } from 'types/store/metamask';

export const initialMetamaskState: StateMetamask = {
  address: '',
  balance: 0,
  connected: false,
  chainId: '',
  selectedAddress: '',
  networkVersion: '',
};
