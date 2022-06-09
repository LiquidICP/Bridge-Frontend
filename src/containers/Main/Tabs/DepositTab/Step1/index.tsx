/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo, useState, useCallback, useEffect,
} from 'react';
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { MetamaskIcon, PlugIcon } from 'assets/img';
// import { getAccountMetamask, getBalanceMetamask } from 'utils/metamask';
// import { ActionsMetamask } from 'store/metamask/constants';
// import { getAccountID } from 'utils/plug';
import { getPlugState } from 'store/plug/selector';
import { connectMetamask, initStateMetamask } from 'store/metamask/actionsCreator';
import { getMetamaskState } from 'store/metamask/selector';
import { initStatePlug } from 'store/plug/actionsCreator';
import { getPlugAccountID } from 'utils/plug';
import { Button, FromToSwitcher, Input } from 'components';
import { WalletButton } from '../WalletButton';
import styles from './styles.module.css';
import { fee } from '../contentDemo';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
  const stateMetamask = useSelector(getMetamaskState);
  const dispatch = useDispatch();
  const statePlug = useSelector(getPlugState);
  const [amount, setAmount] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [plugIsConnected, setPlugIsConnected] = useState(false);
  const [metamaskIsConnected, setMetamaskIsConnected] = useState(false);

  useEffect(() => {
    dispatch(initStateMetamask());
    dispatch(initStatePlug());
  }, [dispatch]);

  const onChangeAmount = useCallback((t: string) => {
    const tmp = t.replaceAll('ICP', '');
    setAmount(`${tmp}ICP`);
    if (t === '') {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, []);

  const onMetamaskClick = useCallback(async () => {
    dispatch(await connectMetamask());
    setMetamaskIsConnected(true);
  }, [dispatch]);

  const onPlugClick = useCallback(async () => {
    dispatch(await getPlugAccountID());
    setPlugIsConnected(true);
  }, [dispatch]);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text="Connect to Plug"
      onClick={onPlugClick}
      textIsClicked={statePlug.accountID}
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
        value={amount}
        onChange={onChangeAmount}
        classNameContainer={styles.step1__input}
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
        onClick={onNextClick}
        isDisabled={isNextDisabled}
        className={styles.step1__next_button}
      >
        Next
      </Button>
    </section>
  );
});

export { Step1 };
