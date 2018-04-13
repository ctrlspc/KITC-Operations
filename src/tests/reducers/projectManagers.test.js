import projectManagersReducer from '../../reducers/projectManagers';
import users from '../fixtures/users';

test('should setup default projectManagers', () => {
  const state = projectManagersReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should set project managers', () => {
  const initialState = [users[2]];
  const testState = [users[0], users[1]];
  const action = {
    type:'SET_PROJECT_MANAGERS',
    projectManagers:testState
  };

  const newState = projectManagersReducer( initialState, action );
  expect(newState).toEqual( testState );
});