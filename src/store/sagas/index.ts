import {
  // fork,
  put, 
} from 'redux-saga/effects';
import { saveTransaction } from 'store/actions';
// import { getResponseSaveTransaction } from 'utils/saveTransaction';

export function* saveTransactionWorker() {
  try {
    // const request = yield fork(getResponseSaveTransaction);
    yield put(saveTransaction());
    // eslint-disable-next-line no-console
    // console.log(request);
  } catch {
    // eslint-disable-next-line no-console
    console.error('ERROR: error fetching server');
  }
}
