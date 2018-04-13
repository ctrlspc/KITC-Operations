import database from '../firebase/firebase';

export const setProjectManagers = (projectManagers) => ({
  type:'SET_PROJECT_MANAGERS',
  projectManagers
});

export const startSetProjectManagers = () => {
  return (dispatch) => {
    return database
    .ref('projectManagers')
    .once('value')
    .then((snapshot) => {
      const projectManagers = [];
      snapshot.forEach(snapshotChild => {
        projectManagers.push({
          id:snapshotChild.key,
          ...snapshotChild.val()
        });
      });
      dispatch(setProjectManagers(projectManagers));
    });
  };
};