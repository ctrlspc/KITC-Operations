import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../reducers';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => (!isAuthenticated ? ( 
      <Component {...props} />
    ) : ( 
      <Redirect to="/dashboard" />
    )
    )} 
  />
);

export const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);