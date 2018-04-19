import projectsReducer from '../../reducers/projects';
import projects from '../fixtures/projects';
import profiles from '../fixtures/profiles';

test('should setup default projects', () => {
  const state = projectsReducer(undefined, {type:'@@INIT'});
  expect(state).toEqual([]);
});

test('should add a project', () => {
  const project = {
    id:'123',
    title: 'an action test',
    description: 'and action description',
    projectManager: profiles[0],
    projectType:'ext'
  }
  
  const action = {
    type: 'ADD_PROJECT', 
    project
  };
  const state = projectsReducer(projects, action);

  expect(state).toEqual([...projects, project]);
});

test('should update a project', () => {
  const updates = {
    title: 'a new title',
    description: 'a new title',
    projectManager: profiles[1],
    projectType: 'int'
  };

  const action = {
    type:'UPDATE_PROJECT', 
    id:projects[0].id, 
    updates
  };

  const state = projectsReducer(projects, action);

  expect(state[0]).toEqual({
    ...projects[0],
    ...updates
  });

});

test('should set projects', () => {
  const initialState = [projects[2]];
  const testState = [projects[0], projects[1]];
  const action = {
    type:'SET_PROJECTS',
    projects:testState
  };

  const newState = projectsReducer( initialState, action );
  expect(newState).toEqual( testState );
});