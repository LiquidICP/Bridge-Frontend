import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import cx from 'classnames';
import { Button } from 'components';
import { getShortAddress, rootBlur } from 'utils';
import { CloseIcon } from 'assets/img';
import styles from './styles.module.css';

interface CongratsModalProps {
  className?: string
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  address: string
  amount: number
}

export const CongratsModal: FC<CongratsModalProps> = ({
  className = '',
  isModalVisible,
  setIsModalVisible,
  address,
  amount,
}) => {
  useEffect(() => {
    if (isModalVisible) rootBlur(true);
  }, [isModalVisible]);

  const handleOk = () => {
    rootBlur(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    rootBlur(false);
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={className}
      footer={null}
      closeIcon={(
        <img
          src={CloseIcon}
          alt="Close"
        />
      )}
    >
      <div className={styles.modal__content__container}>
        <h3 className={styles.modal__title}>Congratulation!</h3>
        <p className={styles.modal__text}>
          You wrapped
          <br />
          <span className={cx(styles.modal__text, styles.modal__text_bigger)}>
            {amount}
            {' '}
            ICP
          </span>
          <br />
          <a href="/">{getShortAddress(address, 15)}</a>
          {` address received ${amount} ICP-20`}
        </p>
        <Button
          onClick={handleCancel}
          theme="gradient"
          className={styles.modal__button}
        >
          Got it!
        </Button>
      </div>
    </Modal>
  );
};
