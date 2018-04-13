import React from 'react';

export default class BasicProjectDetailsForm extends React.Component {
 
  constructor(props) {
    super(props);
    const project = this.props.project;
    this.state = {
      title: project ? project.title : '',
      description: project ? project.description : '',
      projectManager: project ? project.projectManager  : this.props.projectManagers[0] ,
      projectType: project ? project.projectType : 'ext',
      error:''
    };
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({title}));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  };

  onManagerChange = (e) => {
    const projectManager = this.props.projectManagers.find((projectManager) => {
      return projectManager.id === e.target.value
    });
    this.setState(() => ({projectManager}));
  };

  onTypeChange = (e) => {
    const projectType = e.target.value;
    this.setState(() => ({projectType}));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(!this.state.title || !this.state.description || !this.state.projectManager) {
      this.setState(() => ({error:'Please provide a title and project description'}));
    } else {
      this.setState(() => ({error:''}));
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        projectManager: this.state.projectManager ,
        projectType: this.state.projectType
      });
    }
  };

  render () {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p> }
        <input 
          autoFocus
          className="text-input"
          type="text" 
          placeholder="Project Name"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <textarea 
          className="textarea"
          placeholder="Project Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <div className="select-group">
          <div className="select-group__item">
            <h3 className="select-group__title">Project Manager</h3>
            <select 
              className="select-group__select"
              id="project-manager"
              onChange={this.onManagerChange}
              value={!!this.state.projectManager ? this.state.projectManager.id : ''}
            >
              {this.props.projectManagers && this.props.projectManagers.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option> 
              })}
            </select>
          </div>
          <div className="select-group__item">
            <h3 className="select-group__title">Project Type</h3>
            <select 
              className="select-group__select"
              id="project-type" 
              onChange={this.onTypeChange}
              value={this.state.projectType}
            >
              <option value="int">Internal</option>
              <option value="ext">External</option>
            </select>
          </div>
        </div>
        <div>
          <button className="button">Save Project</button>
        </div>
        
      </form>
    );
  };
};
