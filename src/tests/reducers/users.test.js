import usersReducer from '../../reducers/users';
import profiles from '../fixtures/profiles';

test('should setup default projectManagers', () => {
  const state = usersReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should set project managers', () => {
  const initialState = [profiles[2]];
  const testState = [profiles[0], profiles[1]];
  const action = {
    type:'SET_USERS',
    users:testState
  };

  const newState = usersReducer( initialState, action );
  expect(newState).toEqual( testState );
});