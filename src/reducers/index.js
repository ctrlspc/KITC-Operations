import { combineReducers } from 'redux';

import iamReducer, * as fromIamReducer from './iam';
import projectsReducer from './projects';
import usersReducer from './users';

const reducer = combineReducers({
  iam: iamReducer,
  projects: projectsReducer,
  users: usersReducer
});

export const isAuthenticated = (state) => fromIamReducer.isAuthenticated(state.iam);
export const isAuthenticatedUser = (state) => fromIamReducer.isAuthenticatedUser(state.iam);
export const hasUserProfile = (state) => fromIamReducer.hasUserProfile(state.iam);

export const getActiveUsers = (state) => state.users //TODO: cross reference users who are active users.

export default reducer;