import React from 'react';
import { shallow } from 'enzyme';
import { Header , mapDispatchToProps } from '../../components/Header';
import { startLogout } from '../../actions/iam';

jest.mock('../../actions/iam');

let startLogoutMock, wrapper;

beforeEach(() => {
  startLogoutMock = jest.fn();
  wrapper = shallow(<Header startLogout={startLogoutMock}/>);
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogoutMock).toHaveBeenCalled();
});

test('should correctly map dispatch to props', () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  startLogout.mockReturnValue({test:true});
  props.startLogout(1, {uid:'123'});
  expect(startLogout.mock.calls).toHaveLength(1);
  expect(dispatch.mock.calls[0][0]).toEqual({test:true});
});