
import {Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';

import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import CreateProjectPage from '../components/CreateProjectPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ProjectDetailPage from '../components/ProjectDetailPage';
import UserRegistrationPage from '../components/UserRegistrationPage';
import RegistrationRoute from './RegistrationRoute';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <RegistrationRoute path="/register" component={UserRegistrationPage}/>
        <PrivateRoute path="/dashboard" component={DashboardPage}/>
        <PrivateRoute path="/create" component={CreateProjectPage}/>
        <PrivateRoute path="/project/:id" component={ProjectDetailPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
