import React, {
  memo, ReactNode, useState, useCallback,
} from 'react';
import { Button } from 'components/Button';
import { ChangeIcon } from 'assets/img';
import { useDispatch } from 'react-redux';
import { setFrom } from 'store/transaction/actionCreator';
import styles from './styles.module.css';

type SwitcherProps = {
  element1: ReactNode;
  element2: ReactNode;
  switchButton?: ReactNode;
  label1: string;
  label2: string;
};

const FromToSwitcher = memo(({
  element1,
  element2,
  label1,
  label2,
  switchButton,
}: SwitcherProps) => {
  const [from1to2, setFrom1to2] = useState(true);
  const dispatch = useDispatch();

  const onSwitch = useCallback(() => {
    setFrom1to2(!from1to2);
    dispatch(setFrom(from1to2 ? 'polygon' : 'plug'));
  }, [from1to2, dispatch]);

  return (
    <section className={styles.switcher__container}>
      <div>
        <p className={styles.switcher__label}>{label1}</p>
        {from1to2 ? element1 : element2}
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
        {from1to2 ? element2 : element1}
      </div>
    </section>
  );
});

export { FromToSwitcher };
