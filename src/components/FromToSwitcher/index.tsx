import React, {
  memo, ReactNode, useState, useCallback,
} from 'react';
import { Button } from 'components/Button';
import { ChangeIcon } from 'assets/img';
import styles from './styles.module.css';

type SwitcherProps = {
  element1: ReactNode;
  element2: ReactNode;
  switchButton?: ReactNode;
};

const FromToSwitcher = memo(({
  element1,
  element2,
  switchButton,
}: SwitcherProps) => {
  const [from1to2, setFrom1to2] = useState(true);

  const onSwitch = useCallback(() => {
    setFrom1to2(!from1to2);
  }, [from1to2]);

  return (
    <section className={styles.switcher__container}>
      {from1to2 ? element1 : element2}
      {switchButton || (
        <Button
          onClick={onSwitch}
          theme="icon"
          className={styles.switcher__button}
        >
          <img src={ChangeIcon} alt="swap" />
        </Button>
      )}
      {from1to2 ? element2 : element1}
    </section>
  );
});

export { FromToSwitcher };
