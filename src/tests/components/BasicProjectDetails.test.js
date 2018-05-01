import React from 'react';
import { shallow } from 'enzyme';
import BasicProjectDetails from '../../components/BasicProjectDetails';
import projects from '../fixtures/projects';

test('should render a NotFoundPageComponent', () => {
  const wrapper = shallow(<BasicProjectDetails {...projects[0]}/>);
  expect(wrapper).toMatchSnapshot();
});