/* eslint-disable no-debugger */
import { getDfinityContract } from 'api/dfinityContract';
import { useEffect, useMemo, useState } from 'react';
import { getBridgeContract } from 'api/bridgeContract';
import { ethers } from 'ethers';
import { notification } from 'antd';
import { usePlugWallet } from './usePlugWallet';
import { useMetamaskWallet } from './useMetamaskWallet';

export const useCalculationFee = (amount:number, from:string) => {
  const [percentFee, setPercentFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [feeFromContract, SetFeeFromContract] = useState(0);
  const { isPlugConnected } = usePlugWallet();
  const { isMetaMaskConnected } = useMetamaskWallet();
  useEffect(
    () => {
      setIsLoading(true);
      if (from === 'polygon') {
        if (!isMetaMaskConnected) {
          return;
        }
        notification.info({
          message: 'Info',
          description: 'Please approve or wait calculation Fee',
        });
        const contact = getBridgeContract();
        contact.feeRate()
          .then((fee:ethers.BigNumber) => {
            setPercentFee(fee.toNumber() / 10);
            setIsLoading(false);
            SetFeeFromContract(Number(fee) / 1000);
          });
      } else {
        if (!isPlugConnected) {
          return;
        }
        notification.info({
          message: 'Info',
          description: 'Please approve or wait calculation Fee',
        });
        getDfinityContract()
          .then((contract) => contract.getFeeRate())
          .then((contractFee) => {
            setPercentFee(Number(contractFee) / 10);
            setIsLoading(false);
            SetFeeFromContract(Number(contractFee) / 1000);
          });
      }
    },

    [from, isPlugConnected],
  );
  const amountFee = useMemo(() => amount * (percentFee / 100), [amount, percentFee]);
  const receiving = useMemo(() => amount - amountFee, [amount, amountFee]);
  return {
    amountFee, receiving, isLoading, feeFromcontract: feeFromContract,
  };
};
