import React from 'react';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';

const DashboardPage = () => (

  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Projects Dashboard
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Create a Project</Link>
        </div>
      </div>
    </div>
    <div className="content-container">
      <ProjectList projects={[
        {
          id:'123',
          title:'A project',
          description:'a description',
          projectManager:{id:'1',name:'Jason Marshall'},
          projectType:'int'
        }
      ]} />
    </div>
  </div>
  
);

export default DashboardPage;