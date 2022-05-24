import React, { memo } from 'react';
import styles from './styles.module.css';

type InfoProps = {
  label: string;
  text: string;
};

const InfoCard = memo(({
  label,
  text,
}: InfoProps) => (
  <div className={styles.info_card__container}>
    <p className={styles.info_card__label}>
      {label}
    </p>
    <div className={styles.info_card__box}>
      {text}
    </div>
  </div>
));

export { InfoCard };
