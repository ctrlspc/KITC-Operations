import React from 'react';
import { shallow } from 'enzyme';
import CreateProjectPage from '../../components/CreateProjectPage';

test('should render the CreateProjectPage component correctly', () => {
  const wrapper = shallow (<CreateProjectPage />);
  expect(wrapper).toMatchSnapshot();
});