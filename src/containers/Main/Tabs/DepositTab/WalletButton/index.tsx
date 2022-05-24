import React, { memo } from 'react';
import { Button } from 'components';
import { ThemeButton } from 'types/themes';
import cx from 'classnames';
import styles from './styles.module.css';

type WalletButtonProps = {
  icon: string;
  text: string;
  theme?: ThemeButton;
  classNameButton?: string;
  onClick: () => void;
};

const WalletButton = memo(({
  icon,
  text,
  theme = 'primary',
  onClick,
  classNameButton,
}: WalletButtonProps) => (
  <section className={styles.wallet_button__container}>
    <Button
      onClick={onClick}
      theme={theme}
      className={cx(styles.wallet_button__button, classNameButton)}
    >
      <img src={icon} alt="Wallet icon" />
      <p className={styles.wallet_button__text}>{text}</p>
    </Button>
  </section>
));

export { WalletButton };
