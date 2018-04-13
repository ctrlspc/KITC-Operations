import { setProjectManagers } from '../../actions/projectManagers';
import users from '../fixtures/users';

test('should create a SET_PROJECT_MANAGERS action object', () => {
  const action = setProjectManagers(users);
  expect(action).toEqual({
    type:'SET_PROJECT_MANAGERS',
    projectManagers: users
  });
});

