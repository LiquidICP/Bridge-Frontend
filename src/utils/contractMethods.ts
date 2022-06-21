import { getContract } from 'api/contract';

export const getFee = async (tokenAddrees:string) => {
  const contract = getContract();
  const fee = await contract.getFee(tokenAddrees);
  return fee;
};
