import React, { FC } from 'react';
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
      <div className={styles.modalContent}>
        <Text className={styles.title}>Congratulation!</Text>
        <Text className={styles.text}>You wrapped</Text>
        <Text className={cx(styles.text, styles.biggerText)}>
          {amount}
          {' '}
          ICP
        </Text>
        <Text className={styles.text}>
          <a href="/">{getShortAddress(address, 15)}</a>
          {` address received ${amount} ICP-20`}
        </Text>
        <Button
          onClick={handleCancel}
          theme="gradient"
          className={styles.button}
        >
          Got it!
        </Button>
      </div>
    </Modal>
  );
};
