import React from 'react';
import ProjectForm from '../components/ProjectForm';

export default class EditProjectPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectManagers:[{id:'1',name:'Jason Marshall'}, {id:'2', name:'Bec Lloyds'}],
      project: {
        title:'A Test title',
        description:'A great project',
        projectManager:'2',
        projectType:'ext'
      }
    };
  };

  onSubmit = (project) => {
    console.log('onSubmit', project);
  }

  render () {
    return (
      <div className="content-container">
        <h1>Edit an existing Project</h1>
        <ProjectForm 
          onSubmit={this.onSubmit} 
          projectManagers={this.state.projectManagers}
          project={this.state.project}
        />
      </div>
    );
  };
};
