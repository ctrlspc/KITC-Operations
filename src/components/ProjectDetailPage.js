import React from 'react';
import { connect } from 'react-redux';
import BasicProjectDetails from './BasicProjectDetails';
import BasicProjectDetailsForm from './BasicProjectDetailsForm';
import { startUpdateProject } from '../actions/projects';

export class ProjectDetailPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editBasicProjectDetails: !!props.editBasicProjectDetails
    };
  }

  onEditBasicProjectDetails = () => {
    this.setState(() => ({editBasicProjectDetails: true}));
  };

  onFinishedEditingBasicProjectDetails = (updates) => {
    this.props.updateProject(this.props.project.id, updates).then(() => {
      this.setState(() => ({editBasicProjectDetails: false}));
    });
  }

  render (){
    return (
      <div className="content-container">
        <div className="box-section">
          <div className="box-section__header">
            <h1>Basic Project Details</h1>
            {!this.state.editBasicProjectDetails && 
              <button className="button" onClick={this.onEditBasicProjectDetails}>Edit</button>
            }
          </div>
          <div className="box-section__body">
            {
              this.state.editBasicProjectDetails ? 
              (
                <BasicProjectDetailsForm 
                  onSubmit={this.onFinishedEditingBasicProjectDetails} 
                  projectManagers={this.props.projectManagers}
                  project={this.props.project}
                />
              ) : (
                <BasicProjectDetails {...this.props.project} onEditClick={this.onEditBasicProjectDetails}/>
              )
            }
          </div>
        </div>
      </div>
    );
  };
};

export const mapStateToProps = (state, props) => ({
  project: state.projects.find((project) => project.id === props.match.params.id),
  projectManagers: state.projectManagers
});

export const mapDispatchToProps = (dispatch) => ({
  updateProject: (id, project) => dispatch(startUpdateProject(id, project))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailPage);