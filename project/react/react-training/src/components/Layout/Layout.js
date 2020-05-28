import React from 'react';
import {
  Segment,
} from 'semantic-ui-react';
import Header from '../Header';
import Users from '../Users';

import './Layout.scss';

function Layout() {
  return (
    <div className="com-layout">
      <Segment vertical textAlign="left">
        <Header />
      </Segment>
      <Segment vertical textAlign="center" className="com-content">
        <Users />
      </Segment>
    </div>
  );
}

export default Layout;
