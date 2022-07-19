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
import { plugConnect } from 'store/plug/actionsCreator';
import { validatingNumberInput } from 'utils/validatingNumberInput';
import styles from './styles.module.css';

const UnwrapTab = memo(() => {
  const [amountInput, setAmountInput] = useState('');
  const isbuttondasabled = useMemo(() => amountInput === '' || Number(amountInput) === 0, [amountInput]);
  const { balanceWICP, isPlugConnected } = usePlugWallet();
  const dispatch = useDispatch();

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(validatingNumberInput(t));
  }, []);

  const onWithdrawClick = useCallback(() => {
    console.log(Number(amountInput), balanceWICP);
    console.log(Number(amountInput) <= balanceWICP);
    if (balanceWICP > 0 && Number(amountInput) <= balanceWICP) {
      dispatch(transferWICPToICP(amountInput));
      setAmountInput('');
    } else {
      notification.error({
        message: 'Error',
        description: 'Not enough balance',
      });
    }
  }, [amountInput, balanceWICP, dispatch]);

  const onPlugConnectClick = useCallback(() => {
    dispatch(plugConnect());
  }, [dispatch]);
  return (
    <>
      <h2 className={styles.unwrapp__title}>Unwrap</h2>
      <section className={styles.unwrapp__container}>
        <Input
          label="WICP to ICP"
          placeholder="Enter amount"
          value={amountInput}
          onChange={onChangeAmount}
          classNameContainer={styles.unwrapp__input}
        />
        <div className={styles.unwrapp__buttons}>
          <Button
            theme="gradient"
            onClick={onWithdrawClick}
            className={styles.unwrapp_button}
            isDisabled={isbuttondasabled || !isPlugConnected}
          >
            Withdraw
          </Button>
          <Button
            theme="gradient"
            onClick={onPlugConnectClick}
            className={styles.unwrapp_button}
            isDisabled={isPlugConnected}
          >
            Connect to Plug
          </Button>
        </div>
      </section>
    </>
  );
});

export { UnwrapTab };
