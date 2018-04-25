import * as fromIamReducer from "../../reducers/iam";
import reducer, { isAuthenticated, isAuthenticatedUser, hasUserProfile } from '../../reducers';
import { combineReducers } from 'redux';

jest.mock('../../reducers/iam');
jest.mock('redux');

test('should combine reducers correctly', () => {
  expect(combineReducers).toHaveBeenCalledWith(expect.objectContaining({
    iam: expect.any(Function),
    projects: expect.any(Function),
    projectManagers:expect.any(Function)
  }));
});

test('should wire up isAuthenticated', () => {
  const state={test:true};
  fromIamReducer.isAuthenticated.mockReturnValue(true);
  expect(isAuthenticated({iam:state})).toBeTruthy();
  expect(fromIamReducer.isAuthenticated).toHaveBeenCalledWith(state);
});

test('should wire up isAuthenticatedUser', () => {
  const state={test:true};
  fromIamReducer.isAuthenticatedUser.mockReturnValue(true);
  expect(isAuthenticatedUser({iam:state})).toBeTruthy();
  expect(fromIamReducer.isAuthenticatedUser).toHaveBeenCalledWith(state);
});

test('should wire up hasUserProfile', () => {
  const state={test:true};
  fromIamReducer.hasUserProfile.mockReturnValue(true);
  expect(hasUserProfile({iam:state})).toBeTruthy();
  expect(fromIamReducer.hasUserProfile).toHaveBeenCalledWith(state);
  
});