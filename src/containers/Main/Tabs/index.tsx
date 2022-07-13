import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
import { BridgeTab } from './BridgeTab';
import { UnwrapTab } from './UnwrapTab';

const { TabPane } = TabsAntd;

const Tabs: FC = () => (
  <TabsAntd
    centered
    animated={{ inkBar: true, tabPane: false }}
  >
    <TabPane
      tab="Bridge"
      key="1"
    >
      <BridgeTab />
    </TabPane>
    <TabPane
      tab="Unwrap"
      key="2"
    >
      <UnwrapTab />
    </TabPane>
  </TabsAntd>
);

export { Tabs };
