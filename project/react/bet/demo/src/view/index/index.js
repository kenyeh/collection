import React, { Component } from 'react';
import './App.css';

import Header from '../../components/Header';
import TabList from '../../containers/TabList';
import Bet from '../../components/Bet';

export default class Index extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main">
          <Bet />
        </div>
        <TabList />
      </div>
    )
  }
}
