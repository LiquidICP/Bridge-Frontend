import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, InfoBlock, InfoCard } from 'components';
import { transactionSelector } from 'store/transaction/selector';
import { setReceiving } from 'store/transaction/actionCreator';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { usePlugWallet } from 'hooks/usePlugWallet';
import { infoBlocks } from '../contentDemo';
import styles from './styles.module.css';

type Step2Props = {
  onBackClick: () => void;
  onConfirmClick: () => void;
};

const Step2 = memo(({
  onBackClick,
  onConfirmClick,
}: Step2Props) => {
  const stateTransaction = useSelector(transactionSelector.getState);
  const { plugAddress } = usePlugWallet();
  const { metamaskAddress } = useMetamaskWallet();

  const dispatch = useDispatch();

  let currency = '';
  let textFrom = '';
  let textTo = '';
  if (stateTransaction.from === 'polygon') {
    currency = 'WICP';
    textFrom = metamaskAddress || '';
    textTo = plugAddress;
  } else {
    currency = 'ICP';
    textTo = metamaskAddress || '';
    textFrom = plugAddress;
  }

  const fee = infoBlocks.fees;
  const receiving = Number(stateTransaction.amount) - fee;

  const onConfirmButtonClick = useCallback(() => {
    dispatch(setReceiving(receiving));
    onConfirmClick();
  }, [dispatch, receiving, onConfirmClick]);

  return (
    <section className={styles.step2__container}>
      <h3 className={styles.step2__title}>Details</h3>
      <section className={styles.step2__from_to__box}>
        <InfoCard
          label="From"
          text={textFrom}
        />
        <InfoCard
          label="To"
          text={textTo}
        />
      </section>
      <section className={styles.step2__datas__box}>
        <InfoBlock
          label="Sending"
          text={`${stateTransaction.amount} ${currency}`}
        />
        <InfoBlock
          label="Fees"
          text={`${fee} ${currency}`}
        />
        <InfoBlock
          label="Receiving"
          text={`${receiving} ${currency}`}
          className={styles.step2__last_block}
        />
      </section>
      <section className={styles.step2__buttons__box}>
        <Button
          theme="outline_gradient"
          onClick={onBackClick}
          className={styles.step2__button}
        >
          Back
        </Button>
        <Button
          theme="gradient"
          onClick={onConfirmButtonClick}
          className={styles.step2__button}
        >
          Confirm
        </Button>
      </section>
    </section>
  );
});

export { Step2 };
