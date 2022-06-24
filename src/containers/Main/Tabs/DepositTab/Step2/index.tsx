import React, {
  memo, useCallback, useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, InfoBlock, InfoCard } from 'components';
import { transactionSelector } from 'store/transaction/selector';
import { contractApprove } from 'store/transaction/actionCreator';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { usePlugWallet } from 'hooks/usePlugWallet';
import styles from './styles.module.css';

type Step2Props = {
  onBackClick: () => void;
  onConfirmClick: () => void;
};

const Step2 = memo(({
  onBackClick,
  onConfirmClick,
}: Step2Props) => {
  const {
    fee,
    from,
    receiving,
    amount,
  } = useSelector(transactionSelector.getState);
  const { plugAddress } = usePlugWallet();
  const { metamaskAddress } = useMetamaskWallet();

  const dispatch = useDispatch();
  const currency = useMemo(() => (from === 'polygon' ? 'WICP' : 'ICP'), [from]);
  const textFrom = useMemo(() => (from === 'polygon' ? metamaskAddress || '' : plugAddress), [from, metamaskAddress, plugAddress]);
  const textTo = useMemo(() => (from === 'polygon' ? plugAddress : metamaskAddress || ''), [from, metamaskAddress, plugAddress]);

  const onConfirmButtonClick = useCallback(() => {
    dispatch(contractApprove());
    onConfirmClick();
  }, [dispatch, onConfirmClick]);

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
          text={`${amount} ${currency}`}
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
