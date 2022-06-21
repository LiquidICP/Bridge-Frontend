import { bridgeAbi } from 'abi';
import { ethers } from 'ethers';
import { metamaskbridgeAddress } from '../global/constants';

export const getBridgeContract = () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const CONTRACT = new ethers.Contract(metamaskbridgeAddress, bridgeAbi, provider.getSigner());
    return CONTRACT;
  } catch (error) {
    throw new Error('bridge');
  }
};
