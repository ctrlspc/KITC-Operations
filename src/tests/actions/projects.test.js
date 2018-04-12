import { setProjects, addProject, updateProject } from '../../actions/projects';
import projects from '../fixtures/projects';

test('should create a SET_PROJECTS action object', () => {
  const action = setProjects(projects);
  expect(action).toEqual({
    type:'SET_PROJECTS',
    projects
  });
});

test('should create a ADD_PROJECT action object', () => {
  const action = addProject(projects[0]);
  expect(action).toEqual({
    type:'ADD_PROJECT',
    project: projects[0]
  });
});

test('should create a UPDATE_PROJECTS action object', () => {
  const action = updateProject(projects[0].id, projects[0]);
  expect(action).toEqual({
    type: 'UPDATE_PROJECT',
    id: projects[0].id,
    updates: projects[0]
  });
});