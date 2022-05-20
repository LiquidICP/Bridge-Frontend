import 'assets/styles/app.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Routes } from 'containers';
import configureStore from 'store/configureStore';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

const config = configureStore();
export const { store, persistor, history } = config;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
);
