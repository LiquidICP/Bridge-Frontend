import React, {
  memo, ReactNode, useCallback,
} from 'react';
import { Button } from 'components/Button';
import { ChangeIcon } from 'assets/img';
import { useDispatch, useSelector } from 'react-redux';
import { transactionSetState } from 'store/transaction/actionCreator';
import { transactionSelector } from 'store/transaction/selector';
import styles from './styles.module.css';

type SwitcherProps = {
  plug: ReactNode;
  metamask: ReactNode;
  switchButton?: ReactNode;
  label1: string;
  label2: string;
};

const FromToSwitcher = memo(({
  plug,
  metamask,
  label1,
  label2,
  switchButton,
}: SwitcherProps) => {
  const dispatch = useDispatch();
  const { from } = useSelector(transactionSelector.getState);
  const onSwitch = useCallback(() => {
    if (from === 'plug') {
      dispatch(transactionSetState({ from: 'polygon' }));
    }
    if (from === 'polygon') {
      dispatch(transactionSetState({ from: 'plug' }));
    }
  }, [from, dispatch]);

  return (
    <section className={styles.switcher__container}>
      <div>
        <p className={styles.switcher__label}>{label1}</p>
        {from === 'plug' ? plug : metamask}
      </div>
      {switchButton || (
        <Button
          onClick={onSwitch}
          theme="icon"
          className={styles.switcher__button}
        >
          <img
            src={ChangeIcon}
            alt="swap"
          />
        </Button>
      )}
      <div>
        <p className={styles.switcher__label}>{label2}</p>
        {from === 'plug' ? metamask : plug}
      </div>
    </section>
  );
});

export { FromToSwitcher };
