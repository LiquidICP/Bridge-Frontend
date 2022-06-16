import React, { useEffect } from 'react';
// import 'react-toastify/scss';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes } from 'containers';
import { metamaskOnAppMount } from 'store/metamask/actionCreators';
import { ModalProvider } from 'context';
import { Spin } from 'antd';
import { usePlugWallet } from 'hooks/usePlugWallet';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = usePlugWallet();
  useEffect(() => {
    dispatch(metamaskOnAppMount());
  }, [dispatch]);

  return (
    <Spin
      spinning={isLoading}
      tip="Please wait answer from Plug Wallet"
      size="large"
      style={{
        fontSize: '25px',
        color: 'black',
        marginTop: '250px',
      }}
    >

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
    </Spin>
  );
};

export { App };
