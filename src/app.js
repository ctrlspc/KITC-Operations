import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';

import configureStore from './store/configureStore';
import { login, logout, startSetProfile, startSetRoles} from './actions/iam';
import { setProjects, startSetProjects } from './actions/projects';

import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';

import 'normalize.css/normalize.css'; //reset browser css so that we are starting from same place
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import users from './tests/fixtures/users';



const store = configureStore();

const wrapper = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(wrapper, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user)); 
    store.dispatch(startSetProfile(user)).then(() => {
      return store.dispatch(startSetRoles(user));
    })
    .then(() => {
      return store.dispatch(startSetProjects());
    })
    .then(() => {
      renderApp();
        if(history.location.pathname === '/') {
          history.push('/dashboard');
        }
    });
  } else {
    renderApp();
    store.dispatch(logout());
    history.push('/');
  }
});




