import React, { Component } from 'react';
import Routers from "./router";

class App extends Component {
  componentDidMount() {
    // 页面加载 loading 结束
    document.querySelector("#loadding").style.display = "none";
  }
  render() {
    return (
      <Routers />
    );
  }
}

export default App;
