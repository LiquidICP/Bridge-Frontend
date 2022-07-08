import React, { useEffect } from 'react';
// import 'react-toastify/scss';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes } from 'containers';
import { metamaskGetTokensBalance, metamaskOnAppMount } from 'store/metamask/actionCreators';
import { ModalProvider } from 'context';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(metamaskOnAppMount());
    dispatch(metamaskGetTokensBalance());
  }, [dispatch]);

  return (
    <ModalProvider>
      <Routes />
      <ToastContainer
        hideProgressBar
        position="top-center"
        autoClose={3000}
        draggable
        pauseOnHover
        theme="light"
      />
    </ModalProvider>
  );
};

export { App };
