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
import { usePlugWallet } from 'hooks/usePlugWallet';
import { notification } from 'antd';
import styles from './styles.module.css';

const WithdrawTab = memo(() => {
  const [amountInput, setAmountInput] = useState('');
  const isbuttondasabled = useMemo(() => amountInput === '', [amountInput]);
  const { balanceWICP } = usePlugWallet();
  const dispatch = useDispatch();

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
  }, []);

  const onWithdrawClick = useCallback(() => {
    if (balanceWICP > 0 && parseFloat(amountInput) < balanceWICP) {
      dispatch(transferWICPToICP(amountInput));
    } else {
      notification.error({
        message: 'Error',
        description: 'Not enough balance',
      });
    }
  }, [amountInput, balanceWICP, dispatch]);
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

export { WithdrawTab };
