import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Index from './view/index';
const Notmatch = () => <Redirect to="/" />;

const Routers = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component={Index} />
      <Route component={Notmatch} />
    </Switch>
  </Router>
);

export default Routers;
