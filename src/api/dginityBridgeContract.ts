/* eslint-disable @typescript-eslint/no-explicit-any */

import token from 'abi/dfinityToken/token';
import SERVICE from 'abi/dfinityToken/types';
import { plugbridgeAddress } from 'global';

declare let window: any;

export const getDfinityBridgeContract = async () => {
  try {
    const tokenActor = await window.ic.plug.createActor({
      canisterId: plugbridgeAddress,
      interfaceFactory: token,
    });
    return tokenActor as SERVICE;
  } catch (error) {
    // error
  }
};

getDfinityBridgeContract();
