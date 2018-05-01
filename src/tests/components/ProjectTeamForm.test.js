import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import ProjectTeamForm from '../../components/ProjectTeamForm';
import profiles from '../fixtures/profiles';

test('should render a checkbox for all users', () => {
  const wrapper = shallow(<ProjectTeamForm users={profiles} team={[]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should select those users that are passed into the team prop', () => {
  const team = _.map([profiles[0], profiles[1]], (profile) => profile.uid);
  const wrapper = shallow(<ProjectTeamForm users={profiles} team={team}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should set a team member as selected in response to checkbox selection', () => {
  const wrapper = shallow(<ProjectTeamForm users={profiles}/>);
  wrapper.find(`input[name="${profiles[0].uid}"]`).at(0).simulate('change', {target: {checked:true, name:profiles[0].uid}});
  expect(wrapper.state('selectedUsers')).toEqual([profiles[0].uid]);
});

test('should unset a team member as selected in response to checkbox deselection', () => {
  const team = _.map([profiles[0], profiles[1]], (profile) => profile.uid);
  const wrapper = shallow(<ProjectTeamForm users={profiles} team={team}/>);
  expect(wrapper.state('selectedUsers')).toEqual([profiles[0].uid, profiles[1].uid]);
  wrapper.find(`input[name="${profiles[0].uid}"]`).at(0).simulate('change', {target: {checked:false,name:profiles[0].uid}});
  expect(wrapper.state('selectedUsers')).toEqual([profiles[1].uid]);
});

test('should handle onSubmit', () => {
  const onSubmitSpy = jest.fn();
  const preventDefaultSpy = jest.fn();
  const team = _.map([profiles[0], profiles[1]], (profile) => profile.uid);
  const wrapper = shallow(<ProjectTeamForm users={profiles} team={team} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit',{preventDefault:preventDefaultSpy});
  expect(preventDefaultSpy).toHaveBeenCalled();
  expect(onSubmitSpy).toHaveBeenCalledWith([profiles[0].uid, profiles[1].uid]);
});