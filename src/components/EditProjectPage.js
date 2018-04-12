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
          projectManagers={[
            {id:'1',name:'Jason Marshall'}, {id:'2', name:'Bec Lloyds'}
          ]}
          project={this.props.project}
        />
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  project: state.projects.find((project) => project.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  updateProject: (id, project) => dispatch(updateProject(id, project))
})


export default connect(mapStateToProps,mapDispatchToProps)(EditProjectPage);