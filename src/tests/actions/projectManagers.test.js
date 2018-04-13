import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { setProjectManagers, startSetProjectManagers } from '../../actions/projectManagers';
import users from '../fixtures/users';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const projectManagersData = {};
  users.forEach(({id, name}) => {
    projectManagersData[id] = {name};
  });
  database.ref('projectManagers').set(projectManagersData).then(() => done());
});

test('should create a SET_PROJECT_MANAGERS action object', () => {
  const action = setProjectManagers(users);
  expect(action).toEqual({
    type:'SET_PROJECT_MANAGERS',
    projectManagers: users
  });
});

test('should get project managers from database and dispatch a SET_PROJECT_MANAGERS action', (done) => {
  const store = createMockStore();
  store.dispatch(startSetProjectManagers())
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'SET_PROJECT_MANAGERS',
        projectManagers: users
      });
      done();
    });
});

