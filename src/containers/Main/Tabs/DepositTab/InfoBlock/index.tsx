import React, { memo } from 'react';
import styles from './styles.module.css';

type InfoBlockProps = {
  label: string;
  text: string;
};

const InfoBlock = memo(({
  label,
  text,
}: InfoBlockProps) => (
  <div className={styles.info_block__container}>
    <p className={styles.info_block__label}>{label}</p>
    <p className={styles.info_block__text}>{text}</p>
  </div>
));

export { InfoBlock };
