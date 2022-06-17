import React, { memo, useCallback, useState } from 'react';
import { Button, CongratsModal } from 'components';
import { useSelector } from 'react-redux';
import { transactionSelector } from 'store/transaction/selector';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { usePlugWallet } from 'hooks/usePlugWallet';
import styles from './styles.module.css';

type Step3Props = {
  onBackClick: () => void;
};

const Step3 = memo(({
  onBackClick,
}: Step3Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stateTransaction = useSelector(transactionSelector.getState);
  const { plugAddress } = usePlugWallet();
  const { metamaskAddress } = useMetamaskWallet();

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
    address = metamaskAddress || '';
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
      <div className={styles.step3__buttons__box}>
        <Button
          theme="outline_gradient"
          onClick={onBackClick}
        >
          Back
        </Button>
        <Button
          theme="gradient"
          onClick={onClick}
        >
          Got It
        </Button>
      </div>
      <CongratsModal
        isModalVisible={isModalOpen}
        setIsModalVisible={setIsModalOpen}
        amount={`${stateTransaction.receiving} ${currency}`}
        receiving={`${stateTransaction.receiving} ${currency2}`}
        address={address}
      />
    </section>
  );
});

export { Step3 };
