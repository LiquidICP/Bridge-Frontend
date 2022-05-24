import { Button } from 'components';
import React, { FC } from 'react';
import { infoBlocks } from '../contentDemo';
import styles from './styles.module.css';

const Step3: FC = () => (
  <section className={styles.step3__container}>
    <p className={styles.step3__text}>
      You have bridged
    </p>
    <p className={styles.step3__receiving}>
      {infoBlocks.receiving}
    </p>
    <p className={styles.step3__text}>
      coins to Polygon, your ICP-20 tokens will be sent within 12 hours else
      contact our support team in
      {' '}
      <a href="https://discord.com" target="_blank" rel="noreferrer">
        Discord
      </a>
    </p>
    <Button
      theme="gradient"
      onClick={() => {}}
      className={styles.step3__button}
    >
      Got It
    </Button>
  </section>
);

export { Step3 };
