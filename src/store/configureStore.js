import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import iamReducer from '../reducers/iam';
import projectsReducer from '../reducers/projects';
import projectManagersReducer from '../reducers/projectManagers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      iam: iamReducer,
      projects: projectsReducer,
      projectManagers: projectManagersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

