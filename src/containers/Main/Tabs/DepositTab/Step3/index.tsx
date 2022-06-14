import React, { FC, useCallback, useState } from 'react';
import { Button, CongratsModal } from 'components';
import { useSelector } from 'react-redux';
import { getTransactionState } from 'store/transaction/selector';
import { getMetamaskState } from 'store/metamask/selector';
import { getPlugState } from 'store/plug/selector';
// import { congratulation } from '../contentDemo';
import styles from './styles.module.css';

const Step3: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stateTransaction = useSelector(getTransactionState);
  const stateMetamask = useSelector(getMetamaskState);
  const statePlug = useSelector(getPlugState);

  let currency = '';
  let currency2 = '';
  let address = '';
  if (stateTransaction.from === 'polygon') {
    currency = 'WICP';
    currency2 = 'ICP';
    address = statePlug.accountId;
  } else {
    currency = 'ICP';
    currency2 = 'WICP';
    address = stateMetamask.address;
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
