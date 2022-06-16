import 'initialImports';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import configureStore from 'store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app';
import 'assets/styles/app.less';

const config = configureStore();
export const { store, persistor } = config;

const rootElement = document.getElementById('root');

const root = createRoot(rootElement as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
