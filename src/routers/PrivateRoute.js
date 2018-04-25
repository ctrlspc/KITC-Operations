import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import _ from "lodash";

import { isAuthenticated, isAuthenticatedUser } from '../reducers';

export const PrivateRoute = ({
  isAuthenticatedUser,
  isAuthenticated,
  loginRedirect = '/',
  registerRedirect = '/register',
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => {
      if(isAuthenticatedUser) {
        return (
          <div>
            <Header />
            <Component {...props} />
          </div> 
        );
      } else if (!isAuthenticated) {
        return <Redirect to={loginRedirect} />
      } else {
        return <Redirect to={registerRedirect} />
      }
    }} 
  />
);

const mapStateToProps = (state) => (
  {
    isAuthenticatedUser: isAuthenticatedUser(state),
    isAuthenticated: isAuthenticated(state)
  }
);

export default connect(mapStateToProps)(PrivateRoute);