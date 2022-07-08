/* eslint-disable no-console */
import React, {
  FC, useCallback, ReactNode,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Steps } from 'components';
import { StepsSelector } from 'store/steps/selector';
import { stepsIncrement, stepsDecrement, stepToStart } from 'store/steps/actionCreator';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import styles from './styles.module.css';
import { Step3 } from './Step3';

const BridgeTab: FC = () => {
  const step = useSelector(StepsSelector.getState);
  const dispatch = useDispatch();

  const onNextClick = useCallback(() => {
    dispatch(stepsIncrement());
  }, [dispatch]);

  const onBackClick = useCallback(() => {
    dispatch(stepsDecrement());
  }, [dispatch]);

  const onGotItClick = useCallback(() => {
    dispatch(stepToStart());
  }, [dispatch]);

  const stepElements: Record<string, ReactNode> = {
    step1: <Step1 onNextClick={onNextClick} />,
    step2: <Step2
      onBackClick={onBackClick}
      onConfirmClick={onNextClick}
    />,
    step3: <Step3
      onButtonClick={onGotItClick}
    />,
  };

  return (
    <section className={styles.bridge__container}>
      <h2>Bridge</h2>
      <Steps step={step.step} />
      {stepElements[`step${step.step}`]}
    </section>
  );
};

export { BridgeTab };