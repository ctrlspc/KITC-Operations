import React from 'react';
import { connect } from 'react-redux';

import ProjectForm from './ProjectForm';
import { addProject } from '../actions/projects';

export class CreateProjectPage extends React.Component {


  onSubmit = (project) => {
    this.props.addProject(project);
    this.props.history.push('/');
  };

  render () {
    return (
      <div className="content-container">
        <h1>Create a new Project</h1>
        <ProjectForm 
          onSubmit={this.onSubmit} 
          projectManagers={[
            {id:'1',name:'Jason Marshall'}, {id:'2', name:'Bec Lloyds'}
          ]}
        />
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProject: (project) => dispatch(addProject(project))
})

export default connect(undefined, mapDispatchToProps)(CreateProjectPage);

