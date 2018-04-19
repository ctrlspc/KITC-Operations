import projectManagersReducer from '../../reducers/projectManagers';
import profiles from '../fixtures/profiles';

test('should setup default projectManagers', () => {
  const state = projectManagersReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should set project managers', () => {
  const initialState = [profiles[2]];
  const testState = [profiles[0], profiles[1]];
  const action = {
    type:'SET_PROJECT_MANAGERS',
    projectManagers:testState
  };

  const newState = projectManagersReducer( initialState, action );
  expect(newState).toEqual( testState );
});