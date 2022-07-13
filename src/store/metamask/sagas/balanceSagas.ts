import { getContract } from 'api/contract';
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
  // eslint-disable-next-line no-debugger
  debugger;
  const contract = await getContract();
  // console.log('Contract', contract);
  // console.log(await contract.balanceOf(addressWallet));
  const balance: ethers.BigNumber = await contract.balanceOf(addressWallet);
  // console.log('Balance:', balance);
  return balance.toString();
};

export function* getTokensBalanceSaga() {
  try {
    yield put(metamaskSetState({ isTokensBalanceLoading: true }));

    // console.log('get balance step 1');
    const address: MetamaskState['address'] = yield select(metamaskSelectors.getProp('address'));
    // console.log('get balance step 2');
    if (address) {
      // console.log('address', address);
      // console.log('get balance step 3. Is Address');
      const balanceWei: string = yield getTokensBalance(address);
      // console.log('get balance step 4');
      const tokensBalance: string = yield ethers.utils.formatUnits(balanceWei, 8);
      // console.log('get balance step 5 token balance');
      yield put(metamaskSetState({ tokensBalance: Number(tokensBalance) }));
    }
  } catch (err) {
    // console.log('Error getBalanceMetamask', err);
    // sagaExceptionHandler('Unable to get balance'); ****** disable *********
  } finally {
    yield put(metamaskSetState({ isTokensBalanceLoading: false }));
  }
}

export function* balanceSagas() {
  yield takeLatest(MetamaskActionType.GET_TOKENS_BALANCE, getTokensBalanceSaga);
}
