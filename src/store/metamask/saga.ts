import { put } from 'redux-saga/effects';
import { connectMetamask } from './actionsCreator';

export async function* getAccount() {
  try {
    // const address = getAccountMetamask();
    yield put(await connectMetamask());
  } catch (error) {
    return error;
  }
}
