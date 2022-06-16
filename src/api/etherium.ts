import Web3 from 'web3';
import {
  passwordSign,
} from '../global';

export const web3 = new Web3(Web3.givenProvider);

export const getAddress = async (): Promise<string> => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const getChainId = async (): Promise<number> => {
  const chainId = await web3.eth.getChainId();
  return chainId;
};

export const signPersonal = async (message: string): Promise<string> => {
  const address = await getAddress();

  const signature = await web3.eth.personal.sign(
    web3.utils.utf8ToHex(message),
    address,
    passwordSign,
  );
  return signature;
};
