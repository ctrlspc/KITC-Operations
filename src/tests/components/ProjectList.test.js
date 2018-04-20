import React from 'react';
import { shallow } from 'enzyme';
import { ProjectList } from '../../components/ProjectList';
import projects from '../fixtures/projects';

test('should render the ProjectList component correctly with no projects', () => {
  const wrapper = shallow (<ProjectList />);
  expect(wrapper).toMatchSnapshot();
});

test('should render the ProjectList component correctly with projects', () => {
  const wrapper = shallow (<ProjectList projects={projects}/>);
  expect(wrapper).toMatchSnapshot();
});