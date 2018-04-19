export default (state = {}, action ) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        identity:{
          uid:action.user.uid,
          email: action.user.email,
          displayName: action.user.displayName,
          photoURL: action.user.photoURL
        },
        profile:{},
        roles:[],
        isAuthenticated:true,
      };
    case 'LOGOUT':
      return {};

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };

    case 'SET_ROLES':
      return {
        ...state,
        roles: action.roles,
      };
    default:
      return state;
  }
};