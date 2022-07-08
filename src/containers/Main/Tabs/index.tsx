import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
import { BridgeTab } from './BridgeTab';
import { UnwrappTab } from './UnwrappTab';

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
      tab="Unwrapp"
      key="2"
    >
      <UnwrappTab />
    </TabPane>
  </TabsAntd>
);

export { Tabs };
