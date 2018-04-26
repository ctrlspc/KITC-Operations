import React from 'react';
import { connect } from 'react-redux';

import BasicProjectDetailsForm from './BasicProjectDetailsForm';
import { startAddProject } from '../actions/projects';
import { getActiveUsers } from '../reducers';
import { startSetUsers } from '../actions/users';

export class CreateProjectPage extends React.Component {

  constructor(props) {
    super(props);
    this.props.getUsers();
  }

  onSubmit = (project) => {
    this.props.addProject(project);
    this.props.history.push('/');
  };

  render () {
    return (
      <div className="content-container">
        <h1>Create a new Project</h1>
        <BasicProjectDetailsForm 
          onSubmit={this.onSubmit} 
          projectManagers={this.props.users}
        />
      </div>
    );
  };
};

export const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(startSetUsers()),
  addProject: (project) => dispatch(startAddProject(project))
});

export const mapStateToProps = (state) => ({
  users: getActiveUsers(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPage);


