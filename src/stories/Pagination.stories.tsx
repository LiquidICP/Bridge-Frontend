import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pagination } from 'antd';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const Simple: ComponentStory<typeof Pagination> = () => (
  <Pagination
    total={85}
    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    defaultCurrent={1}
    showSizeChanger={false}
  />
);
