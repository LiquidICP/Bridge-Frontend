import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CongratsModal } from 'components';
import { Button } from 'components/Button';
import { rootBlur } from 'utils';

export default {
  title: 'CongratsModal',
  component: CongratsModal,
} as ComponentMeta<typeof CongratsModal>;

export const Primary: ComponentStory<typeof CongratsModal> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    rootBlur(true);
    setIsModalVisible(true);
  };

  return (
    <>
      <Button
        onClick={handleShowModal}
        theme="primary"
      >
        Show Modal
      </Button>
      <CongratsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        address="0x404DcB928a8640798D24E94fC0355D0B25940579"
        amount="100 ICP"
        receiving="100 WICP"
      />
    </>
  );
};
