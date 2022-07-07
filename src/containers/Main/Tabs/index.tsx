import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
import { DepositTab } from './DepositTab';
import { WithdrawTab } from './WithdrawTab';

const { TabPane } = TabsAntd;

const Tabs: FC = () => (
  <TabsAntd
    centered
    animated={{ inkBar: true, tabPane: false }}
  >
    <TabPane
      tab="Deposit"
      key="1"
    >
      <DepositTab />
    </TabPane>
    <TabPane
      tab="Withdraw"
      key="2"
    >
      <WithdrawTab />
    </TabPane>
  </TabsAntd>
);

export { Tabs };
