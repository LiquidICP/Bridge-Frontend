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
  textIsClicked: string;
  isConnected: boolean,
};

const WalletButton = memo(({
  icon,
  text,
  theme = 'primary',
  onClick,
  classNameButton,
  textIsClicked,
  isConnected,
}: WalletButtonProps) => (
  <section className={styles.wallet_button__container}>
    <Button
      onClick={onClick}
      theme={isConnected ? 'gray' : theme}
      className={cx(
        styles.wallet_button__button,
        classNameButton,
        { [styles.wallet_button__gray]: isConnected },
      )}
    >
      <img src={icon} alt="Wallet icon" />
      <p className={styles.wallet_button__text}>
        {isConnected ? textIsClicked : text}
      </p>
    </Button>
  </section>
));

export { WalletButton };
