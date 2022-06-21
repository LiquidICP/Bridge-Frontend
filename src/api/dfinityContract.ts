// import { Principal } from '@dfinity/principal';
import token from '../abi/dfinityToken/tokenDid';

declare let window: any;
export type TokenActor = {
  approve:(address:any, amount:number)=>void
};
export const getDfinityContract = async () => {
  try {
    const tokenCanister = 'oh7zz-gyaaa-aaaai-qfm3a-cai';
    const tokenActor = await window.ic.plug.createActor({
      canisterId: tokenCanister,
      interfaceFactory: token,
    });
    console.log(tokenActor);
    return tokenActor as TokenActor;
  } catch (error) {
    throw new Error('token');
  }
};

getDfinityContract();
