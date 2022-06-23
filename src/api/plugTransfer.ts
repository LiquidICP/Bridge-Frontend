// import { notification } from 'antd';
import { ethers } from 'ethers';

declare let window: any;

export const plugTransfer = async (canisterAddress:string, amount:string) => {
  const requestTransferArg = {
    to: canisterAddress,
    amount: Number(ethers.utils.parseUnits(amount, 8)),
  };

  const transfer = await window.ic.plug.requestTransfer(requestTransferArg);
  // console.log(transfer);
  // const transferStatus = transfer?.transactions?.transactions[0]?.status;
  // console.log(transferStatus);
  return transfer;
  // if (transferStatus === 'COMPLETED') {
  //   notification.success({
  //     message: 'Completed',
  //     description: 'Plug wallet transferred',
  //   });
  // } else if (transferStatus === 'PENDING') {
  //   notification.info({
  //     message: 'Pending',
  //     description: 'Plug wallet is pending',
  //   });
  // } else {
  //   notification.error({
  //     message: 'Failed',
  //     description: 'Plug wallet failed to transfer',
  //   });
  // }
  // return transferStatus;
};
