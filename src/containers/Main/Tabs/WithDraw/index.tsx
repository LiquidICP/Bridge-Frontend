/* eslint-disable func-names */
/* eslint-disable no-console */
import React, {
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Button, Input } from 'components';
import { useDispatch } from 'react-redux';
import { transferWICPToICP } from 'store/transaction/actionCreator';
import styles from './styles.module.css';

const WithDraw = memo(() => {
  const [amountInput, setAmountInput] = useState('');
  const isbuttondasabled = useMemo(() => amountInput === '', [amountInput]);
  const dispatch = useDispatch();

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
  }, []);

  const onWithdrawClick = useCallback(() => {
    dispatch(transferWICPToICP(amountInput));
  }, [amountInput, dispatch]);
  return (
    <>
      <h2 className={styles.withdraw__title}>Withdraw</h2>
      <section className={styles.withdraw__container}>
        <Input
          label="WICP to ICP"
          placeholder="Enter amount"
          value={amountInput}
          onChange={onChangeAmount}
          classNameContainer={styles.withdraw__input}
        />
        <Button
          theme="gradient"
          onClick={onWithdrawClick}
          className={styles.withdraw_button}
          isDisabled={isbuttondasabled}
        >
          Withdraw
        </Button>
      </section>
    </>
  );
});

export { WithDraw };
