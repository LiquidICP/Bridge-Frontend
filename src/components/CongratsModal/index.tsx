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
  amount: string
  receiving: string,
  from: string,
  onClick: () => void;
}

export const CongratsModal: FC<CongratsModalProps> = ({
  className = '',
  isModalVisible,
  setIsModalVisible,
  address,
  amount,
  from,
  receiving,
  onClick,
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
    onClick();
    setIsModalVisible(false);
  };

  const addressExplorer = from === 'polygon'
    ? 'https://icscan.io/account/'
    : 'https://polygonscan.com/address/';

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
        <h3 className={styles.modal__title}>Congratulations!</h3>
        <p className={styles.modal__text}>
          You bridged
          <br />
          <span className={cx(styles.modal__text, styles.modal__text_bigger)}>
            {amount}
          </span>
          <br />
          <a
            href={addressExplorer + address}
            target="_blank"
            rel="noreferrer"
          >
            {getShortAddress(address, 15)}
          </a>
          {` address received ${receiving}`}
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
