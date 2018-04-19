import React from 'react';
import { shallow } from 'enzyme';
import { UserRegistrationPage } from '../../components/UserRegistrationPage';

test('should render the ProjectListItem component correctly for a user who has not registered', () => {
  const iam = {
    identity:{uid:'123'},
    profile:{},
    roles:[]
  };
  const wrapper = shallow (<UserRegistrationPage iam={iam}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render the ProjectListItem component correctly for a user who has not been assigned any roles', () => {
  const iam = {
    identity:{uid:'123'},
    profile:{uid:'123'},
    roles:[]
  };
  const wrapper = shallow (<UserRegistrationPage iam={iam}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render the ProjectListItem component correctly for a user who has completed registration', () => {
  const iam = {
    identity:{uid:'123'},
    profile:{uid:'123'},
    roles:['user']
  };
  const wrapper = shallow (<UserRegistrationPage iam={iam}/>);
  expect(wrapper).toMatchSnapshot();
});