import React from 'react';
import { connect } from 'react-redux';
import BasicProjectDetails from './BasicProjectDetails';
import BasicProjectDetailsForm from './BasicProjectDetailsForm';
import { startUpdateProject } from '../actions/projects';
import { getActiveUsers, convertToTeamMember } from '../reducers';
import { startSetUsers } from '../actions/users';
import ProjectTeamForm from './ProjectTeamForm';
import ProjectTeamView from './ProjectTeamView';
import _ from 'lodash';

export class ProjectDetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.props.getUsers();
    this.state = {
      editBasicProjectDetails: !! props.editBasicProjectDetails,
      editProjectTeam: !! props.editProjectTeam
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

  onEditProjectTeam = () => {
    this.setState(() => ({editProjectTeam: true}));
  };

  onFinishedEditingProjectTeam = (userUIDs) => {
    const filteredUsers = this.props.users.filter((user) => _.includes(userUIDs,user.uid));
    const teamUpdate = _.reduce(
      filteredUsers
      , (accumulator, user) => {
        accumulator[user.uid] = user.displayName;
        return accumulator;
      }
      ,{ });
    this.props.updateProject(this.props.project.id, {team:teamUpdate}).then(() => {
      this.setState(() => ({editProjectTeam: false}));
    });
  };

  render (){
    return (
      <div className="content-container">
        <div className="box-section">
          <div className="box-section__header">
            <h1>Basic Project Details</h1>
            {!this.state.editBasicProjectDetails && 
              <button 
                id="editBasicProjectDetailsButton" 
                className="button" 
                onClick={this.onEditBasicProjectDetails}
              >
                Edit
              </button>
            }
          </div>
          <div className="box-section__body">
            {
              this.state.editBasicProjectDetails ? 
              (
                <BasicProjectDetailsForm 
                  onSubmit={this.onFinishedEditingBasicProjectDetails} 
                  projectManagers={this.props.users}
                  project={this.props.project}
                />
              ) : (
                <BasicProjectDetails {...this.props.project} onEditClick={this.onEditBasicProjectDetails}/>
              )
            }
          </div>
        </div>
        <div className="box-section">
          <div className="box-section__header">
            <h1>Project Team</h1>
            {!this.state.editProjectTeam && 
              <button 
                id="editProjectTeamButton" 
                className="button" 
                onClick={this.onEditProjectTeam}
              >
                Edit
              </button>
            }
          </div>
          <div className="box-section__body">
            {
              this.state.editProjectTeam ?
              (
                <ProjectTeamForm 
                  users={this.props.users} 
                  team={_.keys(this.props.project.team)}
                  onSubmit={this.onFinishedEditingProjectTeam}/>
              ) : (
                <ProjectTeamView team={this.props.project.team}/>
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
  users: getActiveUsers(state)
});

export const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(startSetUsers()),
  updateProject: (id, project) => dispatch(startUpdateProject(id, project))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailPage);