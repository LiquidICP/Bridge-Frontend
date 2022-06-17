import React, { FC, useCallback, useState } from 'react';
import { Button, CongratsModal } from 'components';
import { useSelector } from 'react-redux';
import { transactionSelector } from 'store/transaction/selector';
// import { congratulation } from '../contentDemo';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { usePlugWallet } from 'hooks/usePlugWallet';
import styles from './styles.module.css';

const Step3: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stateTransaction = useSelector(transactionSelector.getState);
  const { plugAddress } = usePlugWallet();
  const { metamaskAddres } = useMetamaskWallet();

  let currency = '';
  let currency2 = '';
  let address = '';
  if (stateTransaction.from === 'polygon') {
    currency = 'WICP';
    currency2 = 'ICP';
    address = plugAddress;
  } else {
    currency = 'ICP';
    currency2 = 'WICP';
    address = metamaskAddres || '';
  }

  const onClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <section className={styles.step3__container}>
      <p className={styles.step3__text}>
        You have bridged
      </p>
      <p className={styles.step3__receiving}>
        {`${stateTransaction.receiving} ${currency}`}
      </p>
      <p className={styles.step3__text}>
        coins to Polygon, your
        {' '}
        {currency2}
        -20 tokens will be sent within 12 hours else
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
        amount={`${stateTransaction.receiving} ${currency}`}
        receiving={`${stateTransaction.receiving} ${currency2}`}
        address={address}
      />
    </section>
  );
};

export { Step3 };
