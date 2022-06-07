import React, { memo } from 'react';
import { Button } from 'components';
import { ThemeButton } from 'types/themes';
import cx from 'classnames';
import { useMobile } from 'hooks';
import { ellipsis } from 'utils/ellipsis';
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
}: WalletButtonProps) => {
  const isMobile = useMobile();
  // eslint-disable-next-line prefer-const
  let ellipsisSize = isMobile ? 25 : 33;
  console.log(textIsClicked);

  return (
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
        <img
          src={icon}
          alt="Wallet icon"
        />
        <p className={styles.wallet_button__text}>
          {isConnected
            ? ellipsis(textIsClicked, ellipsisSize)
            : text}
        </p>
      </Button>
    </section>
  );
});

export { WalletButton };
