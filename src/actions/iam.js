import database, { firebase, googleAuthProvider} from  '../firebase/firebase';

export const login = ({uid,email, displayName, photoURL }) => ({
  type: 'LOGIN',
  user: {uid, email, displayName, photoURL}
});

export const startLogin = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const setProfile = (profile) => ({
  type: 'SET_PROFILE',
  profile
});

export const startSetProfile = (user) => {
  return (dispatch) => {
    return database.ref(`profiles/${user.uid}`).once('value').then((snapshot) => {
      
      if(snapshot.val()){
        dispatch(setProfile({
          uid:snapshot.key,
          ...snapshot.val()
        }));
      }
    });
  };
};

export const setRoles = (roles) => ({
  type: 'SET_ROLES',
  roles
});

export const startSetRoles = (user) => {
  return(dispatch) => {
    return database.ref(`roles/${user.uid}`).once('value').then((snapshot) => {
      if(snapshot.val()) {
        dispatch(setRoles(Object.keys(snapshot.val())));
      }
    });
  }
};


export const startRegisterUser = (user) => {
  return (dispatch) => {

    console.log('Starting User Registration', user);
    const updatedUser = {...user,startedRegistration:true }
    return database.ref(`profiles/${user.uid}`).set(updatedUser).then (() => {
      return dispatch(startSetProfile(user)).then(() => {
        return dispatch(startSetRoles(user));
      });
    });
  };
};
