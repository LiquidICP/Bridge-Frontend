import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configuredReactotron } from 'initialImports/reactotron';
import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { MetamaskState } from './metamask/types';
import { PlugState } from './plug/types';

const sagaMiddleware = createSagaMiddleware();

const metamaskPersistConfig = {
  key: 'metamask',
  storage,
  whitelist: ['address', 'status'] as Array<keyof MetamaskState>,
};
const plugPersistConfig = {
  key: 'plug',
  storage,
  whitelist: ['accountId', 'connected'] as Array<keyof PlugState>,
};

const reducers = {
  ...reducer,
  metamask: persistReducer(metamaskPersistConfig, reducer.metamask),
  plug: persistReducer(plugPersistConfig, reducer.plug),
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
      configuredReactotron != null
        ? configuredReactotron.createEnhancer()
        : (nope: unknown) => nope,
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
