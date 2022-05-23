import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'containers';
import styles from './styles.module.css';

export const Layout = () => (
  <div className={styles.layout__container}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);
