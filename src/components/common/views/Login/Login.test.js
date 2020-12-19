import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login.js';

describe('Component Login', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<Login />);
    expect(component).toBeTruthy();
  });
});
