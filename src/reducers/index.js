import { combineReducers } from 'redux';

import iamReducer, * as fromIamReducer from './iam';
import projectsReducer from './projects';
import projectManagersReducer from './projectManagers';

const reducer = combineReducers({
  iam: iamReducer,
  projects: projectsReducer,
  projectManagers: projectManagersReducer
});

export const isAuthenticated = (state) => fromIamReducer.isAuthenticated(state.iam);
export const isAuthenticatedUser = (state) => fromIamReducer.isAuthenticatedUser(state.iam);
export const hasUserProfile = (state) => fromIamReducer.hasUserProfile(state.iam);

export default reducer;