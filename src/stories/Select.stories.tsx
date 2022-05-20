import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from 'antd';

export default {
  title: 'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

export const Primary: ComponentStory<typeof Select> = () => {
  const { Option } = Select;

  const handleChange = (value: string) => (value);

  return (
    <Select
      defaultValue="10"
      style={{ width: 90 }}
      onChange={handleChange}
    >
      <Option value="10">10</Option>
      <Option value="20">20</Option>
      <Option value="100">100</Option>
      <Option value="all">all</Option>
    </Select>
  );
};
