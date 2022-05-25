import React, { FC, useEffect } from 'react';
import { Modal, Typography } from 'antd';
import cx from 'classnames';
import { Button } from 'components';
import { getShortAddress, rootBlur } from 'utils';
import { CloseIcon } from 'assets/icons';
import styles from './styles.module.css';

interface CongratsModalProps {
  className?: string
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  address: string
  amount: number
}

const { Text } = Typography;

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
      closeIcon={<CloseIcon />}
    >
      <div className={styles.modal_content__container}>
        <Text className={styles.modal__title}>Congratulation!</Text>
        <Text className={styles.modal__text}>You wrapped</Text>
        <Text className={cx(styles.modal__text, styles.modal__bigger_text)}>
          {amount}
          {' '}
          ICP
        </Text>
        <Text className={styles.modal__text}>
          <a href="/">{getShortAddress(address, 15)}</a>
          {` address received ${amount} ICP-20`}
        </Text>
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
