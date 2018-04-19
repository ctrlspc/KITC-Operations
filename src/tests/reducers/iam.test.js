import iamReducer, {calculateIsRegistered} from '../../reducers/iam';
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