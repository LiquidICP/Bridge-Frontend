import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

interface StepsProps {
  className?: string
  step: number
}

export const Steps: FC<StepsProps> = ({ className = '', step }) => (
  <div className={cx(styles.steps, className)}>
    <span className={cx(
      styles.dot,
      { [styles.active]: step === 1 },
      { [styles.completed]: step > 1 },
    )}
    >
      1
    </span>
    <span className={styles.line} />
    <span className={cx(
      styles.dot,
      { [styles.active]: step === 2 },
      { [styles.completed]: step > 2 },
    )}
    >
      2
    </span>
    <span className={styles.line} />
    <span className={cx(
      styles.dot,
      { [styles.active]: step === 3 },
      { [styles.completed]: step > 3 },
    )}
    >
      3
    </span>
  </div>
);
