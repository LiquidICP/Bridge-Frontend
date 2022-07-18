import { getContract } from 'api/contract';

export const getFee = async (tokenAddrees:string) => {
  const contract = getContract();
  if (!contract) return 0;
  const fee = await contract.getFee(tokenAddrees);
  return fee;
};
