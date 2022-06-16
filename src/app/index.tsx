import React, { useEffect } from 'react';
// import 'react-toastify/scss/main.scss';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes } from 'containers';
import { metamaskOnAppMount } from 'store/metamask/actionCreators';
import { ModalProvider } from 'context';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(metamaskOnAppMount());
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
        theme="dark"
      />
    </ModalProvider>
  );
};

export { App };
