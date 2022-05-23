import React, { FC } from 'react';
import styles from './styles.module.css';
import { Tabs } from './Tabs';

const Main: FC = () => (
  <main className={styles.main__container}>
    <Tabs />
  </main>
);

export { Main };
