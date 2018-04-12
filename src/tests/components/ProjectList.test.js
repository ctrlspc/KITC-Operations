import React from 'react';
import { shallow } from 'enzyme';
import ProjectList from '../../components/ProjectList';

test('should render the ProjectList component correctly', () => {
  const wrapper = shallow (<ProjectList />);
  expect(wrapper).toMatchSnapshot();
});