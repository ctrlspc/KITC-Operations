import database from '../firebase/firebase';

export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects
});

export const startSetProjects = () => {
  return (dispatch) => {
    return database.ref(`projects`)
      .once('value')
      .then((snapshot) => {
        const projects = [];

        snapshot.forEach(childsnapshot => {
          projects.push({
            id:childsnapshot.key,
            ...childsnapshot.val()
          });
        });        
        dispatch(setProjects(projects));
      });
  };
};

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project
});

export const startAddProject = ({title, description, projectManager, projectType}) => {
 return (dispatch) => {
    const project = {title, description, projectManager, projectType};

    return database.ref(`projects`)
      .push(project)
      .then((ref) => {
        dispatch(addProject({
          id:ref.key,
          ...project
        }));

        return Promise.resolve(ref.key);
      });
  };
};

export const updateProject = (id, updates) => ({
  type: 'UPDATE_PROJECT',
  id, 
  updates
});

export const startUpdateProject = (id, updates) => {
  return (dispatch) => {
    return database.ref(`projects/${id}`)
      .update(updates)
      .then((ref) => {
        dispatch(updateProject(id, updates));
      });
    };
};
