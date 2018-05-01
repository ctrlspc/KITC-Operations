import React from 'react';
import { shallow } from 'enzyme';
import { ProjectDetailPage, mapStateToProps, mapDispatchToProps } from '../../components/ProjectDetailPage';

import projects from '../fixtures/projects';
import users from '../fixtures/users';
import profiles from '../fixtures/profiles';
import { startUpdateProject } from '../../actions/projects';
import { getActiveUsers } from '../../reducers';
jest.mock('../../actions/projects');
jest.mock('../../reducers');

let getUsers;

beforeEach(() => {
  getUsers = jest.fn();
});

test('should default to be in non-edit mode and render ProjectDetailPage component correctly', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} getUsers={getUsers}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('show edit detail views', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} editBasicProjectDetails={true} getUsers={getUsers}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should toggle ProjectTeam to edit mode when the edit button is clicked', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} editProjectTeam={false} getUsers={getUsers}/>
  );
  expect(wrapper.state('editProjectTeam')).toBeFalsy();
  wrapper.find('#editProjectTeamButton').simulate('click');
  expect(wrapper.state('editProjectTeam')).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
});

test('should handle ProjectTeamForm onSubmit event', () => {

  const updateProject = jest.fn(() => Promise.resolve({}));
  const project = projects[0];
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <ProjectDetailPage 
      updateProject={updateProject} 
      history={history}
      project={project}
      editProjectTeam={true}
      getUsers={getUsers}
      users={users}
    />
  );
  wrapper.find('ProjectTeamForm').prop('onSubmit')([profiles[0].uid,profiles[1].uid]);
  expect(updateProject).toHaveBeenLastCalledWith(projects[0].id, {team:{'123':'Mr Test', '223':'Mr Testy'}});
  expect(wrapper.state.editProjectTeam).toBeFalsy();
  
});

test('should toggle BasicProjectDetailsForm to edit mode when the edit button is clicked', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} editBasicProjectDetails={false} getUsers={getUsers}/>
  );
  wrapper.find('#editBasicProjectDetailsButton').simulate('click');
  expect(wrapper).toMatchSnapshot();
});

test('should handle BasicProjectDetailsForm onSubmit event', () => {

  const updateProject = jest.fn(() => Promise.resolve({}));
  const project = projects[0];
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <ProjectDetailPage 
      updateProject={updateProject} 
      history={history}
      project={project}
      editBasicProjectDetails={true}
      getUsers={getUsers}
    />
  );
  wrapper.find('BasicProjectDetailsForm').prop('onSubmit')(projects[0]);
  expect(updateProject).toHaveBeenLastCalledWith(projects[0].id, projects[0]);
  expect(wrapper.state.editBasicProjectDetails).toBeFalsy();
});

test('should map state to props correctly', () => {
  const state = {
    projects: projects
  };

  getActiveUsers.mockReturnValue(users);

  const props = {
    match: {params: {id: '1'}}
  };

  const map = mapStateToProps(state, props);
  expect(map.project).toEqual(projects[0]);
  expect(map.users).toEqual(users);
  expect(getActiveUsers).toHaveBeenCalledWith(state);

});

test('should correctly map dispatch to props', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  startUpdateProject.mockReturnValue({test:true});
  props.updateProject(1, {uid:'123'});
  expect(startUpdateProject.mock.calls[0][0]).toEqual(1);
  expect(startUpdateProject.mock.calls[0][1]).toEqual({uid:'123'});
  expect(dispatch.mock.calls[0][0]).toEqual({test:true});
});