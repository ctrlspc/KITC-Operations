import React from 'react';
import ProjectForm from './ProjectForm';
export default class CreateProjectPage extends React.Component {


  onSubmit = (project) => {
    console.log('project submitted', project);
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



