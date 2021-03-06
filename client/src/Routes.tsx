import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { DashboardLayout } from "modules/dashboard";
import BoardView from "modules/dashboard/BoardView";

import AccountsView from "modules/dashboard/AccountsView";
import { HomeLayout } from "modules/home";
import HomeView from "modules/home/Home";
import AccountView from "modules/dashboard/AccountView";

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
        <Route exact path="/dashboard/accounts" component={AccountsView} />
        <Route exact path="/dashboard/accounts/:id" component={AccountView} />
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
