import React from 'react';
import { shallow } from 'enzyme';
import { EditProjectPage } from '../../components/EditProjectPage';

import projects from '../fixtures/projects';

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