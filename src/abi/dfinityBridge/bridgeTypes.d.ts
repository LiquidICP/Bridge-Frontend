import type { Principal } from '@dfinity/agent';

export interface RequestBridgingToEndInfo {
  'id' : bigint,
  'address' : string,
  'caller' : Principal,
  'amount' : bigint,
}
export type TxReceipt = SuccesTxReceipt | ErrorTxReceipt;

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

export default interface BRIDGESERVICE {
  'canisterTokenBalance' : () => Promise<bigint>,
  'evacuateTokens' : (arg_0: Principal, arg_1: bigint) => Promise<TxReceipt>,
  'getBotMassenger' : () => Promise<Principal>,
  'getOwner' : () => Promise<Principal>,
  'getRequestBridgingToEndList' : () => Promise<
  Array<RequestBridgingToEndInfo>
  >,
  'init' : (arg_0: Principal, arg_1: Principal) => Promise<undefined>,
  'performBridgingToStart' : (arg_0: bigint, arg_1: Principal) => Promise<
  TxReceipt
  >,
  'requestBridgingToEnd' : (arg_0: bigint, arg_1: string) => Promise<TxReceipt>,
  'setBotMassenger' : (arg_0: Principal) => Promise<boolean>,
  'setOwner' : (arg_0: Principal) => Promise<boolean>,
}
