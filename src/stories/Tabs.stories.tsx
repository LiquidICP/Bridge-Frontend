import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from 'antd';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default {
  title: 'Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

export const Primary: ComponentStory<typeof Tabs> = () => (
  <Tabs defaultActiveKey="1">
    <TabPane
      tab={(
        <span>
          <TableOutlined />
          Monitored Repositories
        </span>
      )}
      key="1"
    >
      Tab 1
    </TabPane>
    <TabPane
      tab={(
        <span>
          <UnorderedListOutlined />
          Forks Watchlist
        </span>
      )}
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>
);
