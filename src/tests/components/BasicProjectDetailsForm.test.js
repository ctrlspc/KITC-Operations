import React from 'react';
import { shallow } from 'enzyme';
import BasicProjectDetailsForm from '../../components/BasicProjectDetailsForm';
import projects from '../fixtures/projects';
import profiles from '../fixtures/profiles';


test('should render form correctly with no project data', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles}/>)
  expect(wrapper).toMatchSnapshot();
});

test('should render form correctly with project data passed in', () => {
  const wrapper = shallow(<BasicProjectDetailsForm project={projects[0]} projectManagers={profiles}/>)
  expect(wrapper).toMatchSnapshot();
});

test('should set the project title', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles} />);
  const value = 'New Title';

  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });

  expect(wrapper.state('title')).toBe(value);
});

test('should set the project description', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles}/>);
  const value = 'New Description';

  wrapper.find('textarea').at(0).simulate('change', {
    target: {value}
  });

  expect(wrapper.state('description')).toBe(value);
});

test('should set the project manager', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles}/>);
  const value = profiles[0].uid;

  wrapper.find('#project-manager').at(0).simulate('change', {
    target: {value}
  });

  expect(wrapper.state('projectManager')).toBe(profiles[0].uid);
});

test('should set the project type', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles}/>);
  const value = 'int';

  wrapper.find('#project-type').at(0).simulate('change', {
    target: {value}
  });

  expect(wrapper.state('projectType')).toBe(value);
});

test('should call onSubmit for a valid submission', () => {
  const onSubmitSpy = jest.fn();
  const preventDefaultSpy = jest.fn();
  const wrapper = shallow(
    <BasicProjectDetailsForm 
      project={projects[0]} 
      onSubmit={onSubmitSpy}
      projectManagers={profiles}
    />);
  wrapper.find('form').simulate('submit',{preventDefault:preventDefaultSpy});
  expect(preventDefaultSpy).toHaveBeenCalled();
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    title: projects[0].title,
    description: projects[0].description,
    projectManager: profiles[0],
    projectType: projects[0].projectType
  });
});

test('should set an error for an invalid submission', () => {
  const wrapper = shallow(<BasicProjectDetailsForm projectManagers={profiles}/>);
  wrapper.find('form').simulate('submit',{preventDefault:() => {}});
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});