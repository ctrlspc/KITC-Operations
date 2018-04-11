import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual({});
});

test('should logout', () => {
  const startingState = {uid:'test'};
  const action = {
    type:'LOGOUT'
  };
  const state = authReducer(startingState, action);
  expect(state).toEqual({});
});

test('should login', () => {
  const startingState = {};
  const uid = 'this is a test';
  const action = {
    type:'LOGIN',
    uid
  };
  const state = authReducer(startingState, action);
  expect(state).toEqual({uid});
})