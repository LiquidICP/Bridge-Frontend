// import { Principal } from '@dfinity/principal';

import { SERVICE } from 'abi/dfinityToken/types';
import token from 'abi/dfinityToken/token';

declare let window: any;

export const getDfinityContract = async () => {
  try {
    const tokenCanister = 'oh7zz-gyaaa-aaaai-qfm3a-cai';
    const tokenActor = await window.ic.plug.createActor({
      canisterId: tokenCanister,
      interfaceFactory: token,
    });
    return tokenActor as SERVICE;
  } catch (error) {
    throw new Error('token');
  }
};

getDfinityContract();
