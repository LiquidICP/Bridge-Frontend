import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

interface StepsProps {
  className?: string
  step: number
}

export const Steps: FC<StepsProps> = ({ className = '', step }) => (
  <div className={cx(styles.steps__container, className)}>
    <span className={cx(
      styles.steps__dot,
      { [styles.steps__dot_active]: step === 1 },
      { [styles.steps__dot_completed]: step > 1 },
    )}
    >
      1
    </span>
    <span className={styles.steps__line} />
    <span className={cx(
      styles.steps__dot,
      { [styles.steps__dot_active]: step === 2 },
      { [styles.steps__dot_completed]: step > 2 },
    )}
    >
      2
    </span>
    <span className={styles.steps__line} />
    <span className={cx(
      styles.steps__dot,
      { [styles.steps__dot_active]: step === 3 },
      { [styles.steps__dot_completed]: step > 3 },
    )}
    >
      3
    </span>
  </div>
);
