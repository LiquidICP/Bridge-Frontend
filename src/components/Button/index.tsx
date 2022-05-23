import React, { memo, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

type ButtonProps = {
  className?: string;
  onClick: () => void;
  theme: 'primary' | 'gray' | 'outline' | 'icon' | 'outline_gradient' | 'gradient';
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
        classTheme,
        { [styles.button__disabled]: isDisabled },
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
