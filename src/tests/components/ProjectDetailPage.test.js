import React from 'react';
import { shallow } from 'enzyme';
import { ProjectDetailPage, mapStateToProps } from '../../components/ProjectDetailPage';

import projects from '../fixtures/projects';
import users from '../fixtures/users';

test('should default to be in non-edit mode and render ProjectDetailPage component correctly', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('show edit detail views', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} editBasicProjectDetails={true}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should toggle to edit mode when the edit button is clicked', () => {
  const wrapper = shallow(
    <ProjectDetailPage project={projects[0]} editBasicProjectDetails={false}/>
  );
  wrapper.find('button').simulate('click');
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {

  const updateProject = jest.fn(() => Promise.resolve({}));
  const project = projects[0];
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <ProjectDetailPage 
      updateProject={updateProject} 
      history={history}
      project={project}
      editBasicProjectDetails={true}
    />
  );
  wrapper.find('BasicProjectDetailsForm').prop('onSubmit')(projects[0]);
  expect(updateProject).toHaveBeenLastCalledWith(projects[0].id, projects[0]);
  expect(wrapper.state.editBasicProjectDetails).toBeFalsy();
});

test('should map state to props correctly', () => {
  const state = {
    projects: projects,
    projectManagers: users
  };
  const props = {
    match: {params: {id: '1'}}
  };
  const map = mapStateToProps(state, props);
  expect(map.project).toEqual(projects[0]);
  expect(map.projectManagers).toEqual(users);

});