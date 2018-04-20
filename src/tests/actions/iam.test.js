import { 
  startLogin, 
  login, 
  startLogout, 
  logout, 
  setRoles, 
  startSetRoles, 
  setProfile, 
  startSetProfile, 
  startRegisterUser} from '../../actions/iam';
import users from '../fixtures/users';
import profiles from '../fixtures/profiles';
import roles from '../fixtures/roles';
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const profileData = {};
  const rolesData = {};

  profiles.forEach(({uid, email, displayName, photoURL}) => {
    profileData[uid] = {email, displayName, photoURL};
  });

  roles.forEach(({uid, user}) => {
    rolesData[uid] = {user};
  });

  database.ref(`roles`).set(rolesData).then(() => {
    database.ref(`profiles`).set(profileData).then(() => done());
  });
});

test('should startLogin using GoogleAuthProvider', () => {
  //TODO: https://github.com/mrbenhowl/mocking-firebase-initializeApp-and-firebase-auth-using-jest
});

test('should signout using', () => {
  //TODO: https://github.com/mrbenhowl/mocking-firebase-initializeApp-and-firebase-auth-using-jest
});

test('should setup an login action object', () => {
  const user = users[0];
  const action = login(user);
  expect(action).toEqual({
    type: 'LOGIN',
    user
  });
});

test('should setup a logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  })
})

test('should setup a SET_PROFILE action object', () => {
  const profile = profiles[0];
  const action = setProfile(profile) 
  expect(action).toEqual({
    type:'SET_PROFILE',
    profile
  });
});

test('should get a profile object for the user from firebase and send a set profile action', (done) => {
  
  const store = createMockStore();
  store.dispatch(startSetProfile(users[0])).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_PROFILE',
      profile:profiles[0]
    });
    done();
  });
});

test('should setup a SET_ROLES action object', () => {
  const roles = ['a_role'];
  const action = setRoles(roles) 
  expect(action).toEqual({
    type:'SET_ROLES',
    roles
  });
});

test('should get the user roles for a user from firebase and send a set profile action', (done) => {
  const store = createMockStore();
  store.dispatch(startSetRoles(users[0])).then(() => {
    expect(store.getActions()[0]).toEqual({
      type:'SET_ROLES',
      roles:['user']
    });
    done();
  });
});

test('should create a user profile in the database', (done) => {
  const store = createMockStore();
  const testUser = {
    uid:'testy',
    displayName:'MR Testy McTesterton'
  };

  store.dispatch(startRegisterUser(testUser)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type:'SET_PROFILE',
      profile:testUser
    });
    expect(actions[1]).toEqual({
      type:'SET_ROLES',
      roles: []
    });

    done();
  })
})