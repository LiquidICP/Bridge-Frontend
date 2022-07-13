/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Principal } from '@dfinity/principal';

import { SERVICE } from 'abi/dfinityToken/types';
import token from 'abi/dfinityToken/token';
// import { notification } from 'antd';

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
    // error
  }
};

getDfinityContract();
