import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/iam';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">KITC</h1>
      <p>Project Operations Tracker</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
    
  </div>
);

export const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);