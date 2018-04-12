
export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects
});

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project
});

export const updateProject = (id, updates) => ({
  type: 'UPDATE_PROJECT',
  id, 
  updates
});
