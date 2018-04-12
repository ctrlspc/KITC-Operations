import React from 'react';
import { shallow } from 'enzyme';
import { CreateProjectPage } from '../../components/CreateProjectPage';
import projects from '../fixtures/projects';

let addProject, history, wrapper;

beforeEach(() => {
  addProject = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<CreateProjectPage addProject={addProject} history={history}/>);
});

test('should render the CreateProjectPage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ProjectForm').prop('onSubmit')(projects[0]);
  expect(addProject).toHaveBeenLastCalledWith(projects[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
})