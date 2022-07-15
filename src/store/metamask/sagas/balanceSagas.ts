/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getBalance, getContract } from 'api/contract';
import { ethers } from 'ethers';
import {
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
// import web3 from 'web3';

// import { sagaExceptionHandler } from 'utils';
// import { ethers } from 'ethers';
import { metamaskSetState } from '../actionCreators';
import { MetamaskActionType } from '../actionTypes';
import { metamaskSelectors } from '../selectors';
import { MetamaskState } from '../types';

export const getTokensBalance = async (
  addressWallet: string,
) => {
  const balance = await getBalance(addressWallet);
  return balance.toString();
};

export function* getTokensBalanceSaga() {
  try {
    yield put(metamaskSetState({ isTokensBalanceLoading: true }));
    const address: MetamaskState['address'] = yield select(metamaskSelectors.getProp('address'));
    if (address) {
      const balanceWei: string = yield getTokensBalance(address);
      const tokensBalance: string = yield ethers.utils.formatUnits(balanceWei, 8);
      yield put(metamaskSetState({ tokensBalance: Number(tokensBalance) }));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(metamaskSetState({ isTokensBalanceLoading: false }));
  }
}

export function* balanceSagas() {
  yield takeLatest(MetamaskActionType.GET_TOKENS_BALANCE, getTokensBalanceSaga);
}
