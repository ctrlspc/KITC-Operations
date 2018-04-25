import React from 'react';
import { mount } from 'enzyme';
import { PublicRoute, mapStateToProps } from '../../routers/PublicRoute';
import { StaticRouter } from 'react-router'
import Route from 'react-router-dom/Route';

test('should render the child Component if the user is not authenticated', () => {
  const ChildComponent = () => <div>This is a test component</div>;
  const context = {}
  const wrapper = mount(<StaticRouter context={context}><PublicRoute component={ChildComponent} iam={{}}/></StaticRouter>);
  expect(wrapper.find('ChildComponent')).toHaveLength(1);
});

test('should redirect to the dashboard if the user is authenticated', () => {
  const ChildComponent = () => <div>This is a test component</div>;
  const context = {};
  const wrapper = mount(
    <StaticRouter context={context}>
      <PublicRoute component={ChildComponent} iam={{identity:{uid:'123'}}}/>
    </StaticRouter>
  );
  expect(wrapper.find('Redirect')).toHaveLength(1);
  expect(context.action).toBe('REPLACE');
  expect(context.url).toBe('/dashboard');  
});

test('should map State to Props correctly', () => {
  const state = {
    iam: {test:true}
  };
  const props = mapStateToProps(state);
  expect(props.iam).toEqual(state.iam);
});