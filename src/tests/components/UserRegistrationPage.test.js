import React from 'react';
import { shallow } from 'enzyme';
import { UserRegistrationPage, mapStateToProps, mapDispatchToProps } from '../../components/UserRegistrationPage';

test('should render the ProjectListItem component correctly for a user who has not registered', () => {
  const user = {uid:'123'};
  const profile = {};
  const roles = [];
  const wrapper = shallow (<UserRegistrationPage user={user} profile={profile} roles={roles}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render the ProjectListItem component correctly for a user who has not been assigned any roles', () => {
  const user = {uid:'123'};
  const profile = {uid:'123'};
  const roles = [];
  const wrapper = shallow (<UserRegistrationPage user={user} profile={profile} roles={roles}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render the ProjectListItem component correctly for a user who has completed registration', () => {
  const user = {uid:'123'};
  const profile = {uid:'123'};
  const roles = ['user'];
  const wrapper = shallow (<UserRegistrationPage user={user} profile={profile} roles={roles}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should call onRegisterButtonClick on button click', () => {
  const user = {uid:'123'};
  const profile = {};
  const roles = [];
  const onRegister = jest.fn();
  const event = {preventDefault: jest.fn()};
  const wrapper = shallow (<UserRegistrationPage onRegister={onRegister} user={user} profile={profile} roles={roles}/>);

  wrapper.find('button').simulate('click',event);

  expect(onRegister).toHaveBeenCalledWith({uid:'123'});
  expect(event.preventDefault).toHaveBeenCalled();
});

test('should map State to Props correctly', () => {
  const state = {
    iam: {
      identity:{uid:'123'},
      profile:{uid:'123'},
      roles:['user']
    }
  };

  const props = mapStateToProps(state);

  expect(props.user).toEqual(state.iam.identity);
  expect(props.profile).toEqual(state.iam.profile);
  expect(props.roles).toEqual(state.iam.roles);

});