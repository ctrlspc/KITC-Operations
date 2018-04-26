import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { setUsers, startSetUsers } from '../../actions/users';
import profiles from '../fixtures/profiles';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const users = {};
  profiles.forEach(({uid, displayName, email, photoURL}) => {
    users[uid] = {displayName, email, photoURL};
  });
  database.ref('profiles').set(users).then(() => done());
});

test('should create a SET_USERS action object', () => {
  const action = setUsers(profiles);
  expect(action).toEqual({
    type:'SET_USERS',
    users: profiles
  });
});

test('should get users from database and dispatch a SET_USERS action', (done) => {
  const store = createMockStore();
  store.dispatch(startSetUsers())
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'SET_USERS',
        users: profiles
      });
      done();
    });
});

