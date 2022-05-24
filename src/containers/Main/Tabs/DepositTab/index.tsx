import React, {
  FC, useState, useCallback, ReactNode,
} from 'react';
import { Steps } from 'components';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import styles from './styles.module.css';

const DepositTab: FC = () => {
  const [step, setStep] = useState(1);
  
  const onNextClick = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const onBackClick = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const stepElements: Record<string, ReactNode> = {
    step1: <Step1 onNextClick={onNextClick} />,
    step2: <Step2 onBackClick={onBackClick} onConfirmClick={onNextClick} />,
  };

  return (
    <section className={styles.deposit__container}>
      <h2>Deposit</h2>
      <Steps step={step} />
      {stepElements[`step${step}`]}
    </section>
  );
};

export { DepositTab };
