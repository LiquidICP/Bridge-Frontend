/* eslint-disable no-debugger */
/* eslint-disable func-names */
/* eslint-disable no-console */
import React, {
  memo,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MetamaskIcon, PlugIcon } from 'assets/img';
import { transactionSelector } from 'store/transaction/selector';
import { metamaskSelectors } from 'store/metamask/selectors';
import { transactionSetState } from 'store/transaction/actionCreator';

import { Button, Input, WalletButton } from 'components';
import { FromToSwitcher } from 'containers';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { metamaskConnect, metamaskDisconnect } from 'store/metamask/actionCreators';
import { plugConnect, plugDisConnect } from 'store/plug/actionsCreator';
import { usePlugWallet } from 'hooks/usePlugWallet';
import { useCalculationFee } from 'hooks';
import { notification } from 'antd';
import { validatingNumberInput } from 'utils/validatingNumberInput';
import { getBalanceMetaMask } from 'utils/metamask';
import styles from './styles.module.css';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
  const { from } = useSelector(transactionSelector.getState);
  const stateMetaMask = useSelector(metamaskSelectors.getState);
  const dispatch = useDispatch();
  const currency = useMemo(() => (from === 'polygon' ? 'WICP' : 'ICP'), [from]);
  const [amountInput, setAmountInput] = useState('');
  const {
    receiving, amountFee, isLoading, percentFee,
  } = useCalculationFee(Number(amountInput) || 0, from);
  const {
    isMetaMaskConnected, metamaskAddress, tokensBalance,
  } = useMetamaskWallet();
  const {
    isPlugConnected, plugAddress, balanceICP, status,
  } = usePlugWallet();

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(validatingNumberInput(t));
  }, []);
  const isbuttondasabled = useMemo(
    () =>
      amountInput === '' || isLoading || Number(amountInput) === 0,

    [isLoading, amountInput],
  );

  console.log(isbuttondasabled);

  const textPlugButton = useMemo(() => {
    if (status === 'DISCONNECTED') {
      return 'Connect to Plug';
    }
    if (status === 'LOADING') {
      return 'Connecting…';
    }
    if (status === 'LOST') {
      return 'Please install plug extension';
    }
    return 'Connect to Plug';
  }, [status]);

  const textMetamaskButton = useMemo(() => {
    if (stateMetaMask.status === 'LOADING') {
      return 'Connecting…';
    }
    if (stateMetaMask.status === 'LOST') {
      return 'Please install metamask extension';
    }
    return 'Connect to Metamask';
  }, [stateMetaMask.status]);

  const onMetaMaskConnectClick = useCallback(() => {
    dispatch(metamaskConnect());
  }, [dispatch]);

  const onMetamaskDisConnect = useCallback(() => {
    dispatch(metamaskDisconnect());
  }, [dispatch]);

  const onPlugDisConnect = useCallback(() => {
    dispatch(plugDisConnect());
  }, [dispatch]);

  const onPlugConnectClick = useCallback(() => {
    dispatch(plugConnect());
  }, [dispatch]);

  const onNextButtonClick = useCallback(async () => {
    if (balanceICP > 0 && parseFloat(amountInput) < balanceICP && from === 'plug') {
      dispatch(transactionSetState({
        fee: amountFee,
        receiving,
        feePercent: percentFee,
        amount: amountInput,
      }));
      onNextClick();
      await getBalanceMetaMask();
    } else if (tokensBalance > 0 && parseFloat(amountInput) < tokensBalance && from === 'polygon') {
      dispatch(transactionSetState({
        fee: amountFee,
        receiving,
        feePercent: percentFee,
        amount: amountInput,
      }));
      onNextClick();
      await getBalanceMetaMask();
    } else {
      notification.error({
        message: 'Error',
        description: 'Not enough balance',
      });
    }
  }, [amountFee, amountInput, balanceICP,
    dispatch, from, onNextClick, percentFee,
    receiving, tokensBalance]);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text={textPlugButton}
      onClick={isPlugConnected ? onPlugDisConnect : onPlugConnectClick}
      textIsClicked={plugAddress}
      isConnected={isPlugConnected}
    />
  );

  const switchElement2 = (
    <WalletButton
      icon={MetamaskIcon}
      text={textMetamaskButton}
      onClick={isMetaMaskConnected ? onMetamaskDisConnect : onMetaMaskConnectClick}
      textIsClicked={metamaskAddress || ''}
      isConnected={isMetaMaskConnected}
    />
  );

  return (
    <section className={styles.step1__container}>
      <FromToSwitcher
        plug={switchElement1}
        metamask={switchElement2}
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
        {isMetaMaskConnected && isPlugConnected
          ? (
            <>
              Fee:
              {' '}
              <span>
                {isLoading ? 'Loading' : `${percentFee}%`}
              </span>
            </>
          )
          : <>&nbsp;</>}
      </p>
      <Button
        theme="gradient"
        onClick={onNextButtonClick}
        isDisabled={isbuttondasabled}
        className={styles.step1__next_button}
      >
        Next
      </Button>
    </section>
  );
});

export { Step1 };
