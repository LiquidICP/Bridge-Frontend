import React, { FC } from 'react';
import { Button } from 'components';
import styles from './styles.module.css';
import { Tabs } from './Tabs';

const Main: FC = () => (
  <main className={styles.main__container}>
    <Tabs />
    <Button theme="outline_gradient" onClick={() => {}}>
      Back
    </Button>
  </main>
);

export { Main };
