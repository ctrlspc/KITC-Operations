import React from 'react';
import { connect } from 'react-redux';
import { startRegisterUser } from '../actions/iam';
import _ from "lodash";

export class UserRegistrationPage extends React.Component {

  onRegisterButtonClick = (e) => {
    e.preventDefault();
    this.props.onRegister(this.props.user);
  };
  
  render () {
    return (
      <div>
        <h3>New User Registration</h3> 
        { _.isEmpty(this.props.profile) ? (
          <button className="button" onClick={this.onRegisterButtonClick}>Register</button>
        ) : (
          _.isEmpty(this.props.roles) ? 
          (
            <p>Your registration is being reviewed by and administrator</p>
          ) : (
            <p>You're all set - you can continue over in the <a href="/dashboard">Dashboard</a></p>
          )
        )
      }
      </div>
    );
  };
}; 

export const mapStateToProps = (state) => {
  console.log(state.iam);
  
  return {
  user: state.iam.identity,
  profile: state.iam.profile,
  roles: state.iam.roles
  }
};

export const mapDispatchToProps = (dispatch) => ({
  onRegister: (user) => dispatch(startRegisterUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistrationPage);

