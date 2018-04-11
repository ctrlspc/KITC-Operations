import { startLogin, login, startLogout, logout } from '../../actions/auth';

test('should setup an login action object', () => {
  const uid = 'this is a test';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should setup a logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
})