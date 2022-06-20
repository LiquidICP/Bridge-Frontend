import { tokenAbi } from 'abi';
import { ethers } from 'ethers';
import { tokenAddress } from '../global/constants';

export const getContract = () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const CONTRACT = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());
    return CONTRACT;
  } catch (error) {
    throw new Error('token');
  }
};
