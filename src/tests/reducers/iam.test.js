import iamReducer, {isAuthenticated, isAuthenticatedUser, hasUserProfile} from '../../reducers/iam';
import users from '../fixtures/users';
import profiles from '../fixtures/profiles';

test('should set default state', () => {
  const state = iamReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual({});
});

test('should logout', () => {
  const startingState = {uid:'test'};
  const action = {
    type:'LOGOUT'
  };
  const state = iamReducer(startingState, action);
  expect(state).toEqual({});
});

test('should login', () => {
  const startingState = {};
  const user = users[0];
  const action = {
    type:'LOGIN',
    user
  };
  const state = iamReducer(startingState, action);
  expect(state.identity).toEqual(user);
  expect(state.profile).toEqual({});
  expect(state.roles).toEqual([]);
});

test('should set user profile', () => {
  const startingState = {
    identity:users[0],
    profile:{},
    roles:[]
  };

  const profile = profiles[0];
  const action = {
    type:'SET_PROFILE',
    profile
  };

  const state = iamReducer(startingState, action);
  expect(state.identity).toEqual(users[0]);
  expect(state.profile).toEqual(profiles[0]);
  expect(state.roles).toEqual([]);

});

test('should set user roles', () => {
  const startingState = {
    identity:users[0],
    profile:profiles[0],
    roles:[]
  };

  const roles = ['user'];

  const action = {
    type:'SET_ROLES',
    roles
  };

  const state = iamReducer(startingState, action);
  expect(state.identity).toEqual(users[0]);
  expect(state.profile).toEqual(profiles[0]);
  expect(state.roles).toEqual(roles);
});

const authenticatedState = {identity:{uiud:'123'}};
const unAuthenticatedState = {identity:{}};
test('should calculate if a user is authenticated', () => {
  expect(isAuthenticated(authenticatedState)).toBeTruthy();
  expect(isAuthenticated(unAuthenticatedState)).toBeFalsy();
});

test('should calculate if a user is an authenticated user', () => {
  const userRole = {roles:['user']};
  const noRoles = {roles:[]};
  expect(isAuthenticatedUser({...authenticatedState, ...userRole})).toBeTruthy();
  expect(isAuthenticatedUser({...authenticatedState, ...noRoles})).toBeFalsy();
  expect(isAuthenticatedUser({...unAuthenticatedState, ...noRoles})).toBeFalsy();
  expect(isAuthenticatedUser({...unAuthenticatedState, ...userRole})).toBeFalsy();
});

test('should calculate if a user has a user profile', () => {
  const hasProfile = {profile:{uid:'123'}};
  const noProfile = {profile:[]};
  expect(hasUserProfile({...authenticatedState, ...hasProfile})).toBeTruthy();
  expect(hasUserProfile({...authenticatedState, ...noProfile})).toBeFalsy();
  expect(hasUserProfile({...unAuthenticatedState, ...noProfile})).toBeFalsy();
  expect(hasUserProfile({...unAuthenticatedState, ...hasProfile})).toBeFalsy();
});