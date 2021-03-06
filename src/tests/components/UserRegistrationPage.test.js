import React from 'react';
import { shallow } from 'enzyme';
import { UserRegistrationPage, mapStateToProps, mapDispatchToProps } from '../../components/UserRegistrationPage';
import { startRegisterUser } from '../../actions/iam';
import { isAuthenticatedUser, hasUserProfile } from  '../../reducers';

jest.mock('../../actions/iam');
jest.mock('../../reducers');

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

  isAuthenticatedUser.mockReturnValue(true);
  hasUserProfile.mockReturnValue(true);

  const props = mapStateToProps(state);

  expect(props.user).toEqual(state.iam.identity);
  expect(props.isAuthenticatedUser).toBe(true);
  expect(props.hasUserProfile).toBe(true);
  expect(isAuthenticatedUser).toHaveBeenCalledWith(state);
  expect(hasUserProfile).toHaveBeenCalledWith(state);

});

test('should correctly map dispatch to props', () => {
  const dispatch = jest.fn();
  
  startRegisterUser.mockReturnValue({test:true});
  
  const props = mapDispatchToProps(dispatch);

  props.onRegister({uid:'123'});

  expect(startRegisterUser.mock.calls[0][0]).toEqual({uid:'123'});
  expect(dispatch.mock.calls[0][0]).toEqual({test:true});
  
});