import { tokenAbi } from 'abi';
import { notification } from 'antd';
import { ethers } from 'ethers';
import { tokenAddress } from '../global/constants';

export const getContract = () => {
  try {
    if (window.ethereum === undefined) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const CONTRACT = new ethers.Contract(tokenAddress, tokenAbi, provider.getSigner());
    return CONTRACT;
  } catch (error) {
    notification.error({
      message: 'Error',
      description: 'Please install Metamask extension',
    });
    throw new Error('token');
  }
};

export const getBalance = async (address: string) => {
  const contract = getContract();
  if (!contract) return 0;
  const balance = await contract.balanceOf(address);
  return balance;
};
