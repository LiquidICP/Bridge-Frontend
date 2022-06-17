import React, {
  FC, useCallback, ReactNode,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Steps } from 'components';
import { getStepsState } from 'store/steps/selector';
import { decrementStep, incrementStep } from 'store/steps/actionCreator';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import styles from './styles.module.css';
import { Step3 } from './Step3';

const DepositTab: FC = () => {
  const step = useSelector(getStepsState);
  const dispatch = useDispatch();

  const onNextClick = useCallback(() => {
    dispatch(incrementStep());
  }, [dispatch]);

  const onBackClick = useCallback(() => {
    dispatch(decrementStep());
  }, [dispatch]);

  const stepElements: Record<string, ReactNode> = {
    step1: <Step1 onNextClick={onNextClick} />,
    step2: <Step2
      onBackClick={onBackClick}
      onConfirmClick={onNextClick}
    />,
    step3: <Step3 />,
  };

  return (
    <section className={styles.deposit__container}>
      <h2>Deposit</h2>
      <Steps step={step.step} />
      {stepElements[`step${step.step}`]}
    </section>
  );
};

export { DepositTab };
