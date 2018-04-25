import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage, mapDispatchToProps } from '../../components/LoginPage';
import { startLogin } from '../../actions/iam';

jest.mock('../../actions/iam');

let startLoginMock, wrapper;

beforeEach(() => {
  startLoginMock = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLoginMock}/>);
});

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLoginMock).toHaveBeenCalled();
});

test('should correctly map dispatch to props', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  startLogin.mockReturnValue({test:true});
  props.startLogin(1, {uid:'123'});
  expect(startLogin.mock.calls).toHaveLength(1);
  expect(dispatch.mock.calls[0][0]).toEqual({test:true});
});