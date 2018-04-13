import React from 'react';

export default ({title, description, projectManager, projectType}) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
    <p><span>Project Manager:</span> {projectManager.name}</p>
  </div>
);