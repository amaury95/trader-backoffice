import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { DashboardLayout } from "modules/dashboard";
import BoardView from "modules/dashboard/BoardView";

import { UserLayout } from "modules/user";
import LoginView from "modules/user/LoginView";
import RegisterView from "modules/user/RegisterView";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" render={DashboardRoutes} />
        <Route path="/session" render={UserRoutes} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

const UserRoutes = () => (
  <UserLayout>
    <Switch>
      <Route path="/session/login" component={LoginView} />
      <Route path="/session/register" component={RegisterView} />
      <Redirect to="/session/login" />
    </Switch>
  </UserLayout>
);

const DashboardRoutes = () => (
  <DashboardLayout>
    <Switch>
      <Route exact path="/dashboard" component={BoardView} />
    </Switch>
  </DashboardLayout>
);
