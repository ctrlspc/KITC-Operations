import React from 'react';
import { shallow } from 'enzyme';
import { CreateProjectPage, mapStateToProps, mapDispatchToProps } from '../../components/CreateProjectPage';
import projects from '../fixtures/projects';
import users from '../fixtures/users';
import { startAddProject } from '../../actions/projects';
import { getActiveUsers } from '../../reducers';

jest.mock('../../actions/projects');
jest.mock('../../reducers');

let addProjectMock, history, wrapper, getUsers;

beforeEach(() => {
  addProjectMock = jest.fn();
  getUsers = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<CreateProjectPage addProject={addProjectMock} getUsers={getUsers} history={history}/>);
});

test('should render the CreateProjectPage component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('BasicProjectDetailsForm').prop('onSubmit')(projects[0]);
  expect(addProjectMock).toHaveBeenLastCalledWith(projects[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
})

test('should map state to props correctly', () => {
  const state = {test:true};
  getActiveUsers.mockReturnValue(users)
  const map = mapStateToProps(state);
  expect(map.users).toEqual(users)
  expect(getActiveUsers).toHaveBeenCalledWith(state);
});

test('should correctly map dispatch to props', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  startAddProject.mockReturnValue({test:true});
  const testProject = {uid:'123'}
  props.addProject(testProject);
  expect(startAddProject.mock.calls[0][0]).toEqual(testProject);
  expect(dispatch.mock.calls[0][0]).toEqual({test:true});
});