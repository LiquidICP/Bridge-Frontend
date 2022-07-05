import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
import { DepositTab } from './DepositTab';
import { WithDraw } from './WithDraw';
// import styles from './styles.module.css';

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
      <WithDraw />
    </TabPane>
  </TabsAntd>
);

export { Tabs };
