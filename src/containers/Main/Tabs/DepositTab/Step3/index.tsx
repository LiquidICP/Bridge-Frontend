import { Button, CongratsModal } from 'components';
import React, { FC, useCallback, useState } from 'react';
import { postFetch } from 'utils/api/saveTransaction';
import { congratulation, infoBlocks } from '../contentDemo';
import styles from './styles.module.css';

const Step3: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = useCallback(() => {
    postFetch({
      id: 0,
      sender: 'string',
      senderType: {},
      amount: 'string',
      recipient: 'string',
      recipientType: {},
      state: {},
      polygonTransactionId: 'string',
    });
    setIsModalOpen(true);
  }, []);

  return (
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
        <a
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </p>
      <Button
        theme="gradient"
        onClick={onClick}
        className={styles.step3__button}
      >
        Got It
      </Button>
      <CongratsModal
        isModalVisible={isModalOpen}
        setIsModalVisible={setIsModalOpen}
        amount={congratulation.amount}
        address={congratulation.address}
      />
    </section>
  );
};

export { Step3 };
