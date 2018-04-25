import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router'
import { isAuthenticated, isAuthenticatedUser } from '../../reducers';
import { PrivateRoute, mapStateToProps } from '../../routers/PrivateRoute';

jest.mock('../../reducers');
jest.mock('../../components/Header'); //becuase it is a connected component and we don't have a store.

let context, wrapper;

const setupTest = (props) => {
  const ChildComponent = () => <div>This is a test component</div>;
  context = {};
  wrapper = mount(
    <StaticRouter context={context}>
      <PrivateRoute component={ChildComponent} {...props}  />
    </StaticRouter>
  );
};

test('should render the component if the user is an authenticated user', () => {
  setupTest({isAuthenticatedUser: true});
  expect(wrapper.find('ChildComponent')).toHaveLength(1);
});

test('should redirect to the default login redirect if the user is not authenticated', () => {
  setupTest({isAuthenticatedUser: false, isAuthenticated:false });
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe('/');  //the default loginRedirect
});

test('should redirect to the specified login redirect if the user is not authenticated', () => {
  const loginRedirect = '/loginRedirect';
  setupTest({isAuthenticatedUser: false, isAuthenticated:false, loginRedirect });
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe(loginRedirect);  //the default loginRedirect
});

test('should redirect to the default register redirect if the user is authenticated but not an authenticatedUser', () => {
  setupTest({isAuthenticatedUser: false, isAuthenticated:true });
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe('/register');  //the default registerRedirect
});

test('should redirect to the specified register redirect if the user is authenticated but not an authenticatedUser', () => {
  const registerRedirect = '/registerRedirect'
  setupTest({isAuthenticatedUser: false, isAuthenticated:true, registerRedirect });
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe(registerRedirect);  //the default registerRedirect
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