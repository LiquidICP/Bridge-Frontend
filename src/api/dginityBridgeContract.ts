/* eslint-disable @typescript-eslint/no-explicit-any */

import bridge from 'abi/dfinityBridge/bridge';
import SERVICE from 'abi/dfinityToken/types';

declare let window: any;

export const getDfinityBridgeContract = async () => {
  try {
    const tokenActor = await window.ic.plug.createActor({
      canisterId: 'oa67n-laaaa-aaaai-qfm3q-cai',
      interfaceFactory: bridge,
    });
    return tokenActor as SERVICE;
  } catch (error) {
    // error
  }
};

getDfinityBridgeContract();
