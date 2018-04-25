import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router'
import { isAuthenticated, isAuthenticatedUser } from '../../reducers';
import { RegistrationRoute, mapStateToProps } from '../../routers/RegistrationRoute';

jest.mock('../../reducers');
jest.mock('../../components/Header'); //becuase it is a connected component and we don't have a store.

let context, wrapper;

const setupTest = (props) => {
  const ChildComponent = () => <div>This is a test component</div>;
  context = {};
  wrapper = mount(
    <StaticRouter context={context}>
      <RegistrationRoute component={ChildComponent} {...props}  />
    </StaticRouter>
  );
};

test('should render the component if the user is authenticated and is not an authenticated user', () => {
  setupTest({isAuthenticated:true, isAuthenticatedUser:false});
  expect(wrapper.find('ChildComponent')).toHaveLength(1);
});

test('should redirect if the user is not authenticated', () => {
  setupTest({isAuthenticated:false, isAuthenticatedUser:false});
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe('/');  //the default loginRedirect
});

test('should redirect if the user is an authenticated user', () => {
  setupTest({isAuthenticated:true, isAuthenticatedUser:true});
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe('/');  //the default loginRedirect
});

test('should map state to props', () => {
  const state = {
    iam: {identify:{test:true}}
  };

  isAuthenticated.mockReturnValue(true);
  isAuthenticatedUser.mockReturnValue(true);

  const props = mapStateToProps(state);

  expect(props.isAuthenticated).toEqual(true);
  expect(isAuthenticated).toHaveBeenCalledWith(state);
  expect(props.isAuthenticatedUser).toEqual(true);
  expect(isAuthenticatedUser).toHaveBeenCalledWith(state);
});