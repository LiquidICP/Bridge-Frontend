import { bridgeAbi } from 'abi';
import { ethers } from 'ethers';
// import { metamaskbridgeAddress } from '../global/constants';

export const getBridgeContract = () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const CONTRACT = new ethers.Contract('0x6e9b5e5d44d09f0c86af2e6fed622f97246c700a', bridgeAbi, provider.getSigner());
    return CONTRACT;
  } catch (error) {
    throw new Error('bridge');
  }
};
