import database from '../firebase/firebase';

export const setUsers = (users) => ({
  type:'SET_USERS',
  users
});

export const startSetUsers = () => {
  return (dispatch) => {
    return database
    .ref('profiles')
    .once('value')
    .then((snapshot) => {
      const users = [];
      snapshot.forEach(snapshotChild => {
        users.push({
          uid:snapshotChild.key,
          ...snapshotChild.val()
        });
      });
      dispatch(setUsers(users));
    });
  };
};