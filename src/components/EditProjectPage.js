import React from 'react';
import { connect } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import { updateProject } from '../actions/projects';

export class EditProjectPage extends React.Component {

  onSubmit = (project) => {
    this.props.updateProject(this.props.project.id, project);
    this.props.history.push('/');
  }

  render () {
    return (
      <div className="content-container">
        <h1>Edit an existing Project</h1>
        <ProjectForm 
          onSubmit={this.onSubmit} 
          projectManagers={this.props.projectManagers}
          project={this.props.project}
        />
      </div>
    );
  };
};

export const mapStateToProps = (state, props) => ({
  project: state.projects.find((project) => project.id === props.match.params.id),
  projectManagers: state.projectManagers
})

export const mapDispatchToProps = (dispatch) => ({
  updateProject: (id, project) => dispatch(updateProject(id, project))
})


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectPage);