/* eslint-disable @typescript-eslint/no-explicit-any */
import token from 'abi/dfinityToken/token';
import SERVICE from 'abi/dfinityToken/types';
import { plugbridgeAddressApproveWICP } from 'global';

declare let window: any;

export const getDfinityContract = async () => {
  try {
    const tokenActor = await window.ic.plug.createActor({
      canisterId: plugbridgeAddressApproveWICP,
      interfaceFactory: token,
    });
    return tokenActor as SERVICE;
  } catch (error) {
    // error
  }
};

getDfinityContract();
