import React, {
  memo, useMemo, useCallback,
} from 'react';
import {
  Button,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { transactionSelector } from 'store/transaction/selector';
import { links } from 'global/links';
import { transactionSetState } from 'store/transaction/actionCreator';
import styles from './styles.module.css';

type Step3Props = {
  onButtonClick: () => void,
};

const Step3 = memo(({
  onButtonClick,
}: Step3Props) => {
  const { from, receiving } = useSelector(transactionSelector.getState);
  const dispatch = useDispatch();

  const currency1 = useMemo(() => (
    from === 'polygon' ? 'WICP' : 'ICP'
  ), [from]);
  const currency2 = useMemo(() => (
    from === 'polygon' ? 'ICP' : 'WICP'
  ), [from]);

  const toText = useMemo(() => (
    from === 'polygon' ? 'Internet Computer' : 'Polygon'
  ), [from]);

  const onClick = useCallback(() => {
    dispatch(transactionSetState({
      status: '',
      receiving: 0,
    }));
    onButtonClick();
  }, [dispatch, onButtonClick]);

  return (
    <section className={styles.step3__container}>
      <p className={styles.step3__text}>
        You have bridged
      </p>
      <p className={styles.step3__receiving}>
        {`${receiving} ${currency1}`}
      </p>
      <p className={styles.step3__text}>
        coins to
        {' '}
        {toText}
        , your
        {' '}
        {currency2}
        {' '}
        tokens will be sent within 12 hours else
        contact our support team in
        {' '}
        <a
          href={links.discord}
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </p>
      <div className={styles.step3__buttons__box}>
        <Button
          theme="gradient"
          onClick={onClick}
        >
          Got It
        </Button>
      </div>
    </section>
  );
});

export { Step3 };
