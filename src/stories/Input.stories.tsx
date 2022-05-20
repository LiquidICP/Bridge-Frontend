import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Simple: ComponentStory<typeof Input> = () => (
  <Input placeholder="Please enter" />
);

export const Password: ComponentStory<typeof Input> = () => (
  <Input.Password
    placeholder="Enter your username"
    prefix={<LockOutlined className="site-form-item-icon" />}
  />
);
