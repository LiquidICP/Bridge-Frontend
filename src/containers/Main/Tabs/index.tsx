import React, { FC } from 'react';
import { Tabs as TabsAntd } from 'antd';
// import styles from './styles.module.css';

const { TabPane } = TabsAntd;

const Tabs: FC = () => (
  <TabsAntd>
    <TabPane tab="Deposit" key="1">
      <h2>Deposit</h2>
    </TabPane>
    <TabPane tab="Withdraw" key="2">
      <h2>Withdraw</h2>
    </TabPane>
  </TabsAntd>
);

export { Tabs };
