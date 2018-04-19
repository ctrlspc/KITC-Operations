import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import _ from "lodash";

export const PrivateRoute = ({
  iam,
  loginRedirect = '/',
  registerRedirect = '/register',
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => {
      if(!_.isEmpty(iam.identity) && !_.isEmpty(iam.roles)) {
        return (
          <div>
            <Header />
            <Component {...props} />
          </div> 
        );
      } else if (_.isEmpty(iam.identity)) {
        return <Redirect to={loginRedirect} />
      } else {
        return <Redirect to={registerRedirect} />
      }
    }} 
  />
);

const mapStateToProps = (state) => (
  {
    iam: state.iam
  }
);

export default connect(mapStateToProps)(PrivateRoute);