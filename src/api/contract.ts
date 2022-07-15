import { tokenAbi } from 'abi';
import { notification } from 'antd';
import { ethers } from 'ethers';
import { tokenAddress } from '../global/constants';

const provider = new ethers.providers.Web3Provider(window.ethereum); /// ******

export const getContract = () => {
  try {
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
  const balance = await contract.balanceOf(address);
  return balance;
};
