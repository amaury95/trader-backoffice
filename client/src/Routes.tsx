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
import { HomeLayout } from "modules/home";
import HomeView from "modules/home/Home";
import UsersView from "modules/dashboard/UsersView";
import AccountsView from "modules/dashboard/AccountsView";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" render={DashboardRoutes} />
        <Route path="/session" render={UserRoutes} />
        <Route path="/" render={HomeRoutes} />
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
      <Route exact path="/dashboard/users" component={UsersView} />
      <Route exact path="/dashboard/accounts" component={AccountsView} />
      {/* <Route exact path="/dashboard/account/:id" component={AccountView} /> */}
      <Redirect to="/dashboard" />
    </Switch>
  </DashboardLayout>
);

const HomeRoutes = () => (
  <HomeLayout>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Redirect to="/" />
    </Switch>
  </HomeLayout>
);
