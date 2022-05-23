import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
import { DepositTab } from './DepositTab';
// import styles from './styles.module.css';

const { TabPane } = TabsAntd;

const Tabs: FC = () => (
  <TabsAntd>
    <TabPane tab="Deposit" key="1">
      <DepositTab />
    </TabPane>
    <TabPane tab="Withdraw" key="2">
      <h2>Withdraw</h2>
    </TabPane>
  </TabsAntd>
);

export { Tabs };
