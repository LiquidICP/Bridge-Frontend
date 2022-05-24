import { Button } from 'components';
import React, { memo } from 'react';
import { addressesForStep2, infoBlocks } from '../contentDemo';
import { InfoBlock } from '../InfoBlock';
import { InfoCard } from '../InfoCard';
import styles from './styles.module.css';

type Step2Props = {
  onBackClick: () => void;
  onConfirmClick: () => void;
};

const Step2 = memo(({
  onBackClick,
  onConfirmClick,
}: Step2Props) => (
  <section className={styles.step2__container}>
    <h3 className={styles.step2__title}>Details</h3>
    <section className={styles.step2__from_to__box}>
      <InfoCard label="From" text={addressesForStep2.from} />
      <InfoCard label="To" text={addressesForStep2.to} />
    </section>
    <section className={styles.step2__datas__box}>
      <InfoBlock
        label="Sending"
        text={infoBlocks.sending}
      />
      <InfoBlock
        label="Fees"
        text={infoBlocks.fees}
      />
      <InfoBlock
        label="Receiving"
        text={infoBlocks.receiving}
      />
    </section>
    <section className={styles.step2__buttons__box}>
      <Button
        theme="outline_gradient"
        onClick={onBackClick}
      >
        Back
      </Button>
      <Button
        theme="gradient"
        onClick={onConfirmClick}
      >
        Confirm
      </Button>
    </section>
  </section>
));

export { Step2 };
