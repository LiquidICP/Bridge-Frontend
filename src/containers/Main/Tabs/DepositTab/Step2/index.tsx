import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'components';
import { getMetamaskState } from 'store/metamask/selector';
import { getPlugState } from 'store/plug/selector';
import { getTransactionState } from 'store/transaction/selector';
import { setReceiving } from 'store/transaction/actionCreator';
import { infoBlocks } from '../contentDemo';
import { InfoBlock } from '../InfoBlock';
import { InfoCard } from '../InfoCard';
import styles from './styles.module.css';

type Step2Props = {
  onBackClick: () => void;
  onConfirmClick: () => void;
};

const Step2 = memo(({
  onBackClick,
  onConfirmClick,
}: Step2Props) => {
  const stateMetamask = useSelector(getMetamaskState);
  const statePlug = useSelector(getPlugState);
  const stateTransaction = useSelector(getTransactionState);
  const dispatch = useDispatch();

  let currency = '';
  if (stateTransaction.from === 'polygon') {
    currency = 'WICP';
  } else {
    currency = 'ICP';
  }

  const fee = infoBlocks.fees;
  const receiving = stateTransaction.amount - fee;

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
          // text={addressesForStep2.from}
          text={statePlug.accountId}
        />
        <InfoCard
          label="To"
          // text={addressesForStep2.to}
          text={stateMetamask.address}
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
