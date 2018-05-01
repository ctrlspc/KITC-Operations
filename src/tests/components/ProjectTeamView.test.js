import React from 'react';
import { shallow } from 'enzyme';
import ProjectTeamView from '../../components/ProjectTeamView';
import projects from '../fixtures/projects';

test('should render a ProjectTeamView component', () => {
  const wrapper = shallow(<ProjectTeamView team={projects[0].team}/>);
  expect(wrapper).toMatchSnapshot();
})