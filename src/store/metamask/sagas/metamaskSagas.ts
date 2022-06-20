import { EventChannel, eventChannel } from 'redux-saga';
import {
  call,
  put,
  select,
  spawn,
  takeLatest,
} from 'redux-saga/effects';

import { MetaMaskInpageProvider } from '@metamask/providers';

import detectEthereumProvider from '@metamask/detect-provider';
import {
  Unwrap,
} from 'types';
import {
  NetworkName,
} from 'global';
import {
  sagaExceptionHandler,
} from 'utils';
import {
  getBalanceMetaMask, getMetamaskChainId, getMetamaskProvider, getNetworkById,
} from 'utils/metamask';
import { notification } from 'antd';
import { toast } from 'react-toastify';
import { metamaskSetState } from '../actionCreators';
import { metamaskSelectors } from '../selectors';
import { MetamaskActionType } from '../actionTypes';
import {
  MetamaskRequestMethod, MetamaskState, MetamaskStatus, Web3Event,
} from '../types';

let metamaskProvider: MetaMaskInpageProvider;

let metamaskProviderChannel: EventChannel<unknown> | undefined;

enum ToastMessage {
  accountChanged = 'Account changed',
  notSupported = 'The app is not supported on this network. Use Polygon',
  notInstalled = 'Please install the MetaMask extension',
}

function closeExistingMetamaskProviderChannel() {
  if (metamaskProviderChannel !== undefined) {
    metamaskProviderChannel.close();
    metamaskProviderChannel = undefined;
  }
}

function* handleMetamskProviderEvents({
  event,
  chainId,
  newAddresses,
}: { event: Web3Event, newAddresses: string[], chainId?: string }) {
  try {
    if (event === Web3Event.chainChanged) {
      yield put(metamaskSetState({
        status: MetamaskStatus.LOADING,
      }));

      const network = getNetworkById(chainId);
      if (network) {
        yield put(metamaskSetState({
          status: MetamaskStatus.CONNECTED,
          network,
        }));
      } else {
        yield put(metamaskSetState({ status: MetamaskStatus.NOT_SUPPORT }));
        notification.error({
          message: 'Error',
          description: ToastMessage.notSupported,
        });
        toast.error(ToastMessage.notSupported);
      }
    }

    if (event === Web3Event.accountsChanged) {
      if (newAddresses && newAddresses.length !== 0) {
        const address = newAddresses[0];

        yield put(metamaskSetState({
          status: MetamaskStatus.CONNECTED,
          address,
        }));
        notification.success({
          message: 'Success',
          description: ToastMessage.accountChanged,
        });
        toast.success(ToastMessage.accountChanged);
      } else {
        yield put(metamaskSetState({
          status: MetamaskStatus.LOST,
        }));
      }
    }
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

function* watchMetamaskProviderChannel() {
  closeExistingMetamaskProviderChannel();

  metamaskProviderChannel = eventChannel((emit) => {
    const accountChangeHandler = (...args: unknown[]) => {
      emit({
        event: Web3Event.accountsChanged,
        newAddresses: [...args][0],
      });
    };

    const disconnectHandler = () => {
      emit({
        event: Web3Event.disconnect,
      });
    };

    const changeNetwork = (...args: unknown[]) => {
      emit({
        event: Web3Event.chainChanged,
        chainId: args[0],
      });
    };

    metamaskProvider.on(Web3Event.accountsChanged, accountChangeHandler);
    metamaskProvider.on(Web3Event.disconnect, disconnectHandler);
    metamaskProvider.on(Web3Event.chainChanged, changeNetwork);

    return () => {};
  });

  yield takeLatest(metamaskProviderChannel, handleMetamskProviderEvents);
}

export function* connectMetamaskSaga() {
  try {
    yield put(metamaskSetState({
      status: MetamaskStatus.LOADING,
    }));
    metamaskProvider = yield getMetamaskProvider();
    if (!metamaskProvider || !metamaskProvider.isMetaMask) {
      yield put(metamaskSetState({ status: MetamaskStatus.LOST }));
      notification.error({
        message: 'Error',
        description: ToastMessage.notInstalled,
      });
      toast.error(ToastMessage.notInstalled);
    }
    if (metamaskProvider) {
      const addresses: string[] = yield metamaskProvider.request({
        method: MetamaskRequestMethod.eth_requestAccounts,
      });

      yield spawn(watchMetamaskProviderChannel);

      if (!addresses.length) {
        yield put(metamaskSetState({
          status: MetamaskStatus.NOT_AVAILABLE,
        }));
        return;
      }
      const networkId: Unwrap<typeof getMetamaskChainId> = yield call(getMetamaskChainId);
      const getBalance: Unwrap<typeof getBalanceMetaMask> = yield call(getBalanceMetaMask);
      const network: NetworkName | null = getNetworkById(networkId);

      if (network) {
        const status: MetamaskStatus = yield select(metamaskSelectors.getProp('status'));
        if (status === MetamaskStatus.LOST) {
          return;
        }
        yield put(metamaskSetState({
          status: MetamaskStatus.CONNECTED,
          address: addresses[0],
          balance: getBalance,
        }));
      } else {
        yield put(metamaskSetState({
          status: MetamaskStatus.NOT_SUPPORT,
        }));
        toast.error(ToastMessage.notSupported);
        notification.error({
          message: 'Error',
          description: ToastMessage.notSupported,
        });
      }
    }
  } catch (err) {
    yield put(metamaskSetState({
      status: MetamaskStatus.NOT_AVAILABLE,
    }));
    sagaExceptionHandler(err);
  }
}

export function* disconnectMetamaskSaga() {
  try {
    const provider: MetaMaskInpageProvider = yield call(detectEthereumProvider);
    let updatedStatus = MetamaskStatus.INIT;

    if (!provider || !provider.isMetaMask) updatedStatus = MetamaskStatus.NOT_AVAILABLE;

    yield put(metamaskSetState({
      status: updatedStatus,
      address: undefined,
    }));

    closeExistingMetamaskProviderChannel();
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* onAppMountSaga() {
  try {
    const address: MetamaskState['address'] = yield select(metamaskSelectors.getProp('address'));
    metamaskProvider = yield getMetamaskProvider();

    if (address !== undefined && metamaskProvider) {
      yield spawn(watchMetamaskProviderChannel);
    }
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

export function* metamaskSagas() {
  yield takeLatest(MetamaskActionType.ON_APP_MOUNT, onAppMountSaga);
  yield takeLatest(MetamaskActionType.CONNECT, connectMetamaskSaga);
  yield takeLatest(MetamaskActionType.DISCONNECT, disconnectMetamaskSaga);
}
