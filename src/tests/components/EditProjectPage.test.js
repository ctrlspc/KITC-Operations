import React from 'react';
import { shallow } from 'enzyme';
import EditProjectPage from '../../components/EditProjectPage';

test('should render the EditProjectPage component correctly', () => {
  const wrapper = shallow (<EditProjectPage />);
  expect(wrapper).toMatchSnapshot();
});