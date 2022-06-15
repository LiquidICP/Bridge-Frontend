import React, { memo } from 'react';
import { useMobile } from 'hooks';
import { ellipsis } from 'utils/ellipsis';
import styles from './styles.module.css';

type InfoProps = {
  label: string;
  text: string;
};

const InfoCard = memo(({
  label,
  text,
}: InfoProps) => {
  const isMobile = useMobile();

  return (
    <div className={styles.info_card__container}>
      <p className={styles.info_card__label}>
        {label}
      </p>
      <div className={styles.info_card__box}>
        {ellipsis(text, isMobile ? 20 : 26)}
      </div>
    </div>
  );
});

export { InfoCard };
