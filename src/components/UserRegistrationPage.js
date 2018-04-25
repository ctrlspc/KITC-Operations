import React from 'react';
import { connect } from 'react-redux';
import { startRegisterUser } from '../actions/iam';
import { isAuthenticated, hasUserProfile } from '../reducers';

export class UserRegistrationPage extends React.Component {

  onRegisterButtonClick = (e) => {
    e.preventDefault();
    this.props.onRegister(this.props.user);
  };
  
  render () {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">KITC Operations Registration</h1>
          { !this.props.hasUserProfile ? (
            <div>
              <p>You can only use this app if you work for the KITC. If you do, great, hit register below!</p>
              <button className="button" onClick={this.onRegisterButtonClick}>Register</button>
            </div>
          ) : (
            this.isAuthenticatedUser ? 
            (
              <p>You're all set - you can continue over in the <a href="/dashboard">Dashboard</a></p>
            ) : (
              <p>Your registration is being reviewed by an administrator. You'll be notified by email when your account is activated.</p>
            )
          )
          }
        </div>
      </div>
    );
  };
}; 

export const mapStateToProps = (state) => ({
  user: state.iam.identity,
  isAuthenticatedUser: isAuthenticatedUser(state),
  hasUserProfile: hasUserProfile(state)
});

export const mapDispatchToProps = (dispatch) => ({
  onRegister: (user) => dispatch(startRegisterUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationPage);

