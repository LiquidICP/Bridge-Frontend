import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const onChange = (e: CheckboxChangeEvent) => (
  (e.target.checked)
);

export const Primary: ComponentStory<typeof Checkbox> = () => (
  <Checkbox onChange={onChange}>Checkbox</Checkbox>
);
