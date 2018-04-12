import React from 'react';
import { shallow } from 'enzyme';
import ProjectListItem from '../../components/ProjectListItem';

test('should render the ProjectListItem component correctly', () => {
  const wrapper = shallow (<ProjectListItem projectManager={{name:'test'}}/>);
  expect(wrapper).toMatchSnapshot();
});