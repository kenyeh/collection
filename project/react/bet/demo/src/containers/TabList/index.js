import React, { PureComponent } from 'react';
import { Tabs, Badge } from 'antd-mobile';

import './tablist.css';
import ChatContainer from '../../containers/ChatContainer'
import BetsList from '../../components/BetsList'
import Trends from '../../components/Trends'

const tabs = [
  { title: <Badge text={'3'}>聊天室</Badge> },
  { title: <Badge dot>走势图</Badge> },
  { title: <Badge text={'999'}>投注用户</Badge> },
];

class TabList extends PureComponent {
  render() {
    return (
      <div className="tablist">
        <Tabs tabs={tabs}
          initialPage={1}
          swipeable={false}
          tabBarPosition="left"
          tabDirection="vertical"
        >
          <div className="tablist-chart">
            <ChatContainer />
          </div>
          <div className="tablist-trend">
            <Trends />
          </div>
          <div className="tablist-bet">
            <BetsList />
          </div>
        </Tabs>
      </div>
    )
  }
}

export default TabList;
