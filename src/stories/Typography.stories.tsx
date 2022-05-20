import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography } from 'antd';

const { Title } = Typography;

export default {
  title: 'Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

export const TypographyWithTitle: ComponentStory<typeof Typography> = () => (
  <>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
  </>
);
