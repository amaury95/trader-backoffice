import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { DashboardLayout } from "modules/dashboard";
import BoardView from "modules/dashboard/BoardView";

import UsersView from "modules/dashboard/UsersView";
import AccountsView from "modules/dashboard/AccountsView";
import { HomeLayout } from "modules/home";
import HomeView from "modules/home/Home";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" render={DashboardRoutes} />
        <Route path="/" render={HomeRoutes} />
      </Switch>
    </Router>
  );
}

const DashboardRoutes = () => (
  <HomeLayout>
    <DashboardLayout>
      <Switch>
        <Route exact path="/dashboard" component={BoardView} />
        <Route exact path="/dashboard/users" component={UsersView} />
        <Route exact path="/dashboard/accounts" component={AccountsView} />
        <Redirect to="/dashboard" />
      </Switch>
    </DashboardLayout>
  </HomeLayout>
);

const HomeRoutes = () => (
  <HomeLayout>
    <Route exact path="/" component={HomeView} />
  </HomeLayout>
);
