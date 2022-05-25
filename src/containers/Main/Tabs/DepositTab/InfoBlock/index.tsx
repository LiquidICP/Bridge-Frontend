import React, { memo } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

type InfoBlockProps = {
  label: string;
  text: string;
  className?: string;
};

const InfoBlock = memo(({
  label,
  text,
  className,
}: InfoBlockProps) => (
  <div className={cx(styles.info_block__container, className)}>
    <p className={styles.info_block__label}>{label}</p>
    <p className={styles.info_block__text}>{text}</p>
  </div>
));

export { InfoBlock };
