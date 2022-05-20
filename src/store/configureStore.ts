import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const reducers = {
  router: routerReducer,
  ...reducer,
};

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || window.__REDUX_DEVTOOLS_EXTENSION__
    || compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware,
      ),
    ),
  );

  const history = createReduxHistory(store);

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor, history };
};
