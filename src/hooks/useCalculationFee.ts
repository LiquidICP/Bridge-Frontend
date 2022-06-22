import { getDfinityContract } from 'api/dfinityContract';
import { useEffect, useMemo, useState } from 'react';
import { getBridgeContract } from 'api/bridgeContract';
import { ethers } from 'ethers';

export const useCalculationFee = (amount:number, from:string) => {
  const [percentFee, setPercentFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    () => {
      setIsLoading(true);
      if (from === 'polygon') {
        const contact = getBridgeContract();
        contact.feeRate()
          .then((fee:ethers.BigNumber) => {
            setPercentFee(fee.toNumber() / 10);
            setIsLoading(false);
          });
      } else {
        getDfinityContract()
          .then((contract) => contract.getFeeRate())
          .then((contractFee) => {
            setPercentFee(Number(contractFee) / 10);
            setIsLoading(false);
          });
      }
    },

    [from],
  );
  const amountFee = useMemo(() => amount * (percentFee / 100), [amount, percentFee]);
  const reciving = useMemo(() => amount - amountFee, [amount, amountFee]);
  return { amountFee, reciving, isLoading };
};
