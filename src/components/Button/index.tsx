import React, { memo, ReactNode } from 'react';
import cx from 'classnames';
import { ThemeButton } from 'types/themes';
import styles from './styles.module.css';

type ButtonProps = {
  className?: string;
  onClick: () => void;
  theme: ThemeButton;
  isDisabled?: boolean;
  children: ReactNode;
};

const Button = memo(({
  className,
  onClick,
  theme,
  isDisabled = false,
  children,
}: ButtonProps) => {
  const classTheme = styles[theme];

  return (
    <button
      className={cx(
        styles.button__container,
        isDisabled ? styles.button__disabled : classTheme,
        className,
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {theme === 'outline_gradient'
        ? (
          <div className={styles.outline_gradient__internal}>
            {children}
          </div>
        )
        : children}
    </button>
  );
});

export { Button };
