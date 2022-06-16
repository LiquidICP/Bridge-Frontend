/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo, useState, useCallback, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MetamaskIcon, PlugIcon } from 'assets/img';
import {
  connectMetamask,
  getAccountInfoMetamask,
  initStateMetamask,
  isConnectMetamask,
} from 'store/metamask/actionsCreator';
import { getPlugState } from 'store/plug/selector';
import { getMetamaskState } from 'store/metamask/selector';
import { getTransactionState } from 'store/transaction/selector';
import { setAmount } from 'store/transaction/actionCreator';
import { initStatePlug, connectPlug } from 'store/plug/actionsCreator';
import { Button, Input, WalletButton } from 'components';
import { FromToSwitcher } from 'containers';
import styles from './styles.module.css';
import { fee } from '../contentDemo';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
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

  let inputAmountInit = '';
  if (stateTransaction.amount !== 0) {
    inputAmountInit = stateTransaction.amount.toString();
  }

  const [amountInput, setAmountInput] = useState(inputAmountInit);
  const [isNextDisabled, setIsNextDisabled] = useState(!amountInput);
  const [plugIsConnected, setPlugIsConnected] = useState(false);
  const [metamaskIsConnected, setMetamaskIsConnected] = useState(false);

  useEffect(() => {
    (async function () {
      dispatch(await isConnectMetamask());
      if (stateMetamask.connected) {
        dispatch(await getAccountInfoMetamask());
        setMetamaskIsConnected(true);
      } else {
        dispatch(initStateMetamask());
      }
      dispatch(initStatePlug());
    }());
  }, [dispatch]);

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
    if (t === '') {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [currency]);

  const onMetamaskClick = useCallback(async () => {
    dispatch(await connectMetamask());
    setMetamaskIsConnected(true);
  }, [dispatch]);

  const onPlugClick = useCallback(async () => {
    dispatch(await connectPlug());
    setPlugIsConnected(true);
  }, [dispatch]);

  const onNextButtonClick = useCallback(() => {
    const amountForState = amountInput;
    dispatch(setAmount(amountForState));
    onNextClick();
  }, [amountInput, dispatch]);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text="Connect to Plug"
      onClick={onPlugClick}
      textIsClicked={statePlug.accountId}
      isConnected={plugIsConnected}
    />
  );

  const switchElement2 = (
    <WalletButton
      icon={MetamaskIcon}
      text="Connect to Metamask"
      onClick={onMetamaskClick}
      textIsClicked={stateMetamask.address}
      isConnected={metamaskIsConnected}
    />
  );

  return (
    <section className={styles.step1__container}>
      <FromToSwitcher
        element1={switchElement1}
        element2={switchElement2}
        label1="From"
        label2="To"
      />
      <Input
        label="Amount"
        placeholder="Enter amount"
        value={amountInput}
        onChange={onChangeAmount}
        classNameContainer={styles.step1__input}
        currency={currency}
      />
      <p className={styles.step1__fee}>
        {metamaskIsConnected && plugIsConnected
          ? (
            <>
              Fee:
              {' '}
              <span>
                {fee}
              </span>
            </>
          )
          : <>&nbsp;</>}
      </p>
      <Button
        theme="gradient"
        onClick={onNextButtonClick}
        isDisabled={isNextDisabled}
        className={styles.step1__next_button}
      >
        Next
      </Button>
    </section>
  );
});

export { Step1 };
