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
import { plugIsInstalled } from 'utils/plug';
import { getBalanceMetaMask } from 'utils/metamask';
import { Button, Input, WalletButton } from 'components';
import { FromToSwitcher } from 'containers';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { metamaskConnect } from 'store/metamask/actionCreators';
import { plugConnect } from 'store/plug/actionsCreator';
import { usePlugWallet } from 'hooks/usePlugWallet';
import { useCalculationFee } from 'hooks';
import { notification } from 'antd';
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
  const { receiving, amountFee, isLoading } = useCalculationFee(Number(amountInput) || 0, from);
  const { isMetaMaskConnected, metamaskAddress, balance } = useMetamaskWallet();
  const {
    isPlugConnected, plugAddress, balanceICP,
  } = usePlugWallet();
  const [textPlugButton, setTextPlugButton] = useState('Connect to Plug');
  const [
    textMetamaskButton, setTextMetamaskButton,
  ] = useState('Connect to Metamask');
  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
  }, []);
  console.log(from);
  const isbuttondasabled = useMemo(() => amountInput === '' || isLoading, [isLoading, amountInput]);

  const onMetaMaskConnectClick = useCallback(() => {
    if (stateMetaMask.balance === '') {
      setTextMetamaskButton('Connecting…');
    }
    dispatch(metamaskConnect());
  }, [dispatch, setTextMetamaskButton, stateMetaMask]);

  const onPlugConnectClick = useCallback(() => {
    if (plugIsInstalled()) {
      setTextPlugButton('Connecting…');
    }
    dispatch(plugConnect());
  }, [dispatch]);

  const onNextButtonClick = useCallback(async () => {
    if (balanceICP > 0 && parseFloat(amountInput) < balanceICP && from === 'plug') {
      dispatch(transactionSetState({
        fee: amountFee,
        receiving,
        amount: amountInput,
      }));
      onNextClick();
      await getBalanceMetaMask();
    } else if (balance > 0 && parseFloat(amountInput) < balance && from === 'polygon') {
      dispatch(transactionSetState({
        fee: amountFee,
        receiving,
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
  }, [amountFee, amountInput, balance, balanceICP, dispatch, from, onNextClick, receiving]);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text={textPlugButton}
      onClick={onPlugConnectClick}
      textIsClicked={plugAddress}
      isConnected={isPlugConnected}
    />
  );

  const switchElement2 = (
    <WalletButton
      icon={MetamaskIcon}
      text={textMetamaskButton}
      onClick={onMetaMaskConnectClick}
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
                {isLoading ? 'Loading' : amountFee}
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
