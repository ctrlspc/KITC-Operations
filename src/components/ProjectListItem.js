import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, title, projectManager, projectType }) => (
  <Link className="list-item" to={`/project/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
      <p className="list-item__subtitle">{projectManager.name}</p>
    </div>
    <p className="list-item__data">{projectType}</p>
  </Link>
);