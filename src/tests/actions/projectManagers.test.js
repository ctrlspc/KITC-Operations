import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { setProjectManagers, startSetProjectManagers } from '../../actions/projectManagers';
import profiles from '../fixtures/profiles';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const projectManagersData = {};
  profiles.forEach(({uid, displayName, email, photoURL}) => {
    projectManagersData[uid] = {displayName, email, photoURL};
  });
  database.ref('projectManagers').set(projectManagersData).then(() => done());
});

test('should create a SET_PROJECT_MANAGERS action object', () => {
  const action = setProjectManagers(profiles);
  expect(action).toEqual({
    type:'SET_PROJECT_MANAGERS',
    projectManagers: profiles
  });
});

test('should get project managers from database and dispatch a SET_PROJECT_MANAGERS action', (done) => {
  const store = createMockStore();
  store.dispatch(startSetProjectManagers())
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'SET_PROJECT_MANAGERS',
        projectManagers: profiles
      });
      done();
    });
});

