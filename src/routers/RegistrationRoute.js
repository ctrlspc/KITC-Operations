import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import { isAuthenticated, isAuthenticatedUser } from '../reducers';

export const PrivateRoute = ({
  isAuthenticated,
  isAuthenticatedUser,
  redirect = '/',
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => {
      if(!isAuthenticated || isAuthenticatedUser) {
        return <Redirect to={redirect} />
      } else {
        return (
          <div>
            <Header />
            <Component {...props} />
          </div> 
        );
      }
    }}
  />
);

const mapStateToProps = (state) => (
  {
    isAuthenticated: isAuthenticated(state),
    isAuthenticatedUser: isAuthenticatedUser(state)
  } 
);

export default connect(mapStateToProps)(PrivateRoute);