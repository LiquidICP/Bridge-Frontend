import type { Principal } from '@dfinity/agent';

export type AccountIdentifier = Array<number>;
export interface Metadata {
  'fee' : bigint,
  'decimals' : number,
  'owner' : Principal,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'symbol' : string,
}
export type Time = bigint;
export interface TokenInfo {
  'holderNumber' : bigint,
  'deployTime' : Time,
  'metadata' : Metadata,
  'historySize' : bigint,
  'cycles' : bigint,
  'feeTo' : Principal,
}
export interface Tokens { 'e8s' : bigint }

export type SuccesTxReceipt = { 'Ok' : bigint };
export type ErrorTxReceipt = {
  'Err' : { 'InsufficientAllowance' : null } |
  { 'InsufficientBalance' : null } |
  { 'ErrorOperationStyle' : null } |
  { 'Unauthorized' : null } |
  { 'LedgerTrap' : null } |
  { 'ErrorTo' : null } |
  { 'Other' : string } |
  { 'BlockUsed' : null } |
  { 'AmountTooSmall' : null }
};
export type TxReceipt = SuccesTxReceipt | ErrorTxReceipt;
export default interface SERVICE {
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'burn' : (arg_0: bigint) => Promise<TxReceipt>,
  'canisterBalanceICP' : () => Promise<Tokens>,
  'getAccountIndetifier' : () => Promise<AccountIdentifier>,
  'getAllowanceSize' : () => Promise<bigint>,
  'getBotMassenger' : () => Promise<Principal>,
  'getDecimals' : () => Promise<number>,
  'getFeeRate' : () => Promise<bigint>,
  'getHolders' : (arg_0: bigint, arg_1: bigint) => Promise<
  Array<[Principal, bigint]>
  >,
  'getLogo' : () => Promise<string>,
  'getMetadata' : () => Promise<Metadata>,
  'getName' : () => Promise<string>,
  'getOwner' : () => Promise<Principal>,
  'getPercentageDistributionOfICPtoOwnerWallet' : () => Promise<bigint>,
  'getPrincipal' : () => Promise<Principal>,
  'getPrincipalCanister' : () => Promise<Principal>,
  'getSymbol' : () => Promise<string>,
  'getTokenFee' : () => Promise<bigint>,
  'getTokenInfo' : () => Promise<TokenInfo>,
  'getTotalSupply' : () => Promise<bigint>,
  'getUserApprovals' : (arg_0: Principal) => Promise<
  Array<[Principal, bigint]>
  >,
  'getWrapperToken' : (arg_0: bigint, arg_1: Principal) => Promise<TxReceipt>,
  'historySize' : () => Promise<bigint>,
  'init' : (
    arg_0: string,
    arg_1: string,
    arg_2: string,
    arg_3: number,
    arg_4: Principal,
    arg_5: Principal,
    arg_6: Principal,
    arg_7: bigint,
    arg_8: bigint,
  ) => Promise<undefined>,
  'mint' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'setBotMassenger' : (arg_0: Principal) => Promise<undefined>,
  'setFee' : (arg_0: bigint) => Promise<undefined>,
  'setFeeRate' : (arg_0: bigint) => Promise<undefined>,
  'setFeeTo' : (arg_0: Principal) => Promise<undefined>,
  'setFeeWallet' : (arg_0: Principal) => Promise<undefined>,
  'setLogo' : (arg_0: string) => Promise<undefined>,
  'setName' : (arg_0: string) => Promise<undefined>,
  'setOwner' : (arg_0: Principal) => Promise<undefined>,
  'setPercentageDistributionOfICPtoOwnerWallet' : (arg_0: bigint) => Promise<
  undefined
  >,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'transferFrom' : (
    arg_0: Principal,
    arg_1: Principal,
    arg_2: bigint,
  ) => Promise<TxReceipt>,
  'unwrappedWICP' : (arg_0: bigint) => Promise<TxReceipt>,
}
