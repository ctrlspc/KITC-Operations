import React from 'react';
import { connect } from 'react-redux';

import ProjectListItem from './ProjectListItem';

export const ProjectList = (props) => (
  <div>
    <div className="list-header">
      <div className="show-for-mobile">Projects</div>
      <div className="show-for-desktop">Project</div>
      <div className="show-for-desktop">Type</div>
    </div>
    <div className="list-body">
      {
        !props.projects || props.projects.length === 0 ? (
          <p>No Projects!</p>
        ) : (
          props.projects.map((project) => <ProjectListItem key={project.id} {...project}/>)
        )
      }
    </div>
  </div>
)

export const mapStateToProps = (state) => ({
  projects: state.projects
});


export default connect(mapStateToProps)(ProjectList);
