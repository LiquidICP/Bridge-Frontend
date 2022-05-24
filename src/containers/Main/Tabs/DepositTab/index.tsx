import React, { FC, useState, useCallback } from 'react';
import { Step1 } from './Step1';
import styles from './styles.module.css';

const DepositTab: FC = () => {
  const [step, setStep] = useState(1);
  
  const onNextClick = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  return (
    <section className={styles.deposit__container}>
      <h2>Deposit</h2>
      <Step1 onNextClick={onNextClick} />
    </section>
  );
};

export { DepositTab };
