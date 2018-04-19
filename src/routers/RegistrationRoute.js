import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  isRegistered,
  redirect = '/',
  component: Component,
  ...rest
}) => (
  <Route 
    {...rest} 
    component={(props) => {
      if(!isAuthenticated || isRegistered) {
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
    isAuthenticated: state.iam.isAuthenticated,
    isRegistered: state.iam.isRegistered
  } 
);

export default connect(mapStateToProps)(PrivateRoute);