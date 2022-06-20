/* eslint-disable func-names */
/* eslint-disable no-console */
import React, {
  memo,
  useState,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MetamaskIcon, PlugIcon } from 'assets/img';
import { transactionSelector } from 'store/transaction/selector';
import { metamaskSelectors } from 'store/metamask/selectors';
import { setAmount } from 'store/transaction/actionCreator';
import { plugIsInstalled } from 'utils/plug';
import { getBalanceMetaMask } from 'utils/metamask';
import { Button, Input, WalletButton } from 'components';
import { FromToSwitcher } from 'containers';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { metamaskConnect } from 'store/metamask/actionCreators';
import { plugConnect } from 'store/plug/actionsCreator';
import { usePlugWallet } from 'hooks/usePlugWallet';
import styles from './styles.module.css';
import { fee } from '../contentDemo';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
  const stateTransaction = useSelector(transactionSelector.getState);
  const stateMetaMask = useSelector(metamaskSelectors.getState);
  const dispatch = useDispatch();
  console.log(stateTransaction.amount);
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
  const { isMetaMaskConnected, metamaskAddress } = useMetamaskWallet();
  const { isPlugConnected, plugAddress } = usePlugWallet();
  const [textPlugButton, setTextPlugButton] = useState('Connect to Plug');
  const [
    textMetamaskButton, setTextMetamaskButton,
  ] = useState('Connect to Metamask');

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
    if (t === '') {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, []);

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
    const amountForState = amountInput;
    dispatch(setAmount(amountForState));
    onNextClick();
    await getBalanceMetaMask();
  }, [amountInput, dispatch, onNextClick]);

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
        {isMetaMaskConnected && isPlugConnected
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
