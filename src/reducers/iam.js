import _ from "lodash";
const iamDefaultState = {};

export default (state = iamDefaultState, action ) => {
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

export const isAuthenticated = (state) => {
  return !_.isEmpty(state.identity);
};

export const isAuthenticatedUser = (state) => {
  return isAuthenticated(state) && _.includes(state.roles, 'user');
}

export const hasUserProfile = (state) => {
  return isAuthenticated(state) && (!_.isEmpty(state.profile));
}