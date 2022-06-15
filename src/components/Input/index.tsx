import React, { memo, ChangeEvent, useCallback } from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

type InputProps = {
  isDisabled?: boolean;
  onChange: (t: string) => void;
  value: string;
  className?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  placeholder?: string;
  label?: string;
  currency?: string;
};

const Input = memo(({
  isDisabled = false,
  onChange,
  className,
  classNameContainer,
  classNameLabel,
  label,
  placeholder,
  value,
  currency,
}: InputProps) => {
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={cx(styles.input__container, classNameContainer)}>
      <label
        className={cx(styles.input__label, classNameLabel)}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChangeInput}
        disabled={isDisabled}
        className={cx(styles.input__field, className)}
      />
      {currency && (
        <div
          className={styles.input__currency}
          style={{ left: (value.length * 10.5) + 24 }}
        >
          {value === '' ? '' : currency}
        </div>
      )}
    </div>
  );
});

export { Input };
