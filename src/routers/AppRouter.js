
import {Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';

import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import CreateProjectPage from '../components/CreateProjectPage';
import EditProjectPage from '../components/EditProjectPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={DashboardPage}/>
        <PrivateRoute path="/create" component={CreateProjectPage}/>
        <PrivateRoute path="/edit/:id" component={EditProjectPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
