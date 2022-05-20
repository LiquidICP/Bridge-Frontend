import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Removing: ComponentStory<typeof Modal> = () => {
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Removing',
      icon: <ExclamationCircleOutlined />,
      content: 'Click Ok to confirm removing repository from the list',
      onOk() {

      },
      onCancel() {

      },
    });
  };

  return (
    <Button
      type="primary"
      size="small"
      onClick={showConfirm}
    >
      Remove
    </Button>
  );
};
