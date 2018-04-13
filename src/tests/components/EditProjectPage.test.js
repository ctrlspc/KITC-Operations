import React from 'react';
import { shallow } from 'enzyme';
import { EditProjectPage, mapStateToProps, mapDispatchToProps } from '../../components/EditProjectPage';

import projects from '../fixtures/projects';
import users from '../fixtures/users';

let updateProject, history, wrapper, project ;

beforeEach(() => {
  updateProject = jest.fn();
  project = projects[0];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditProjectPage 
      updateProject={updateProject} 
      history={history}
      project={project}
    />);
});

test('should render the EditProjectPage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ProjectForm').prop('onSubmit')(projects[0]);
  expect(updateProject).toHaveBeenLastCalledWith(projects[0].id, projects[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should map state to props correctly', () => {
  const state = {
    projects: projects,
    projectManagers: users
  };

  const props = {
    match: {params: {id: 1}}
  };
  
  const map = mapStateToProps(state, props);

  expect(map.project).toEqual(project[0]);
  expect(map.projectManagers).toEqual(users);

});