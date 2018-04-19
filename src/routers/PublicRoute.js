import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from "lodash";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => (_.isEmpty(iam.identity) ? ( 
      <Component {...props} />
    ) : ( 
      <Redirect to="/dashboard" />
    )
    )} 
  />
);

const mapStateToProps = (state) => ({
  iam: state.iam
});

export default connect(mapStateToProps)(PublicRoute);