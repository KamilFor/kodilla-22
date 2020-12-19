import React from 'react';
import { shallow } from 'enzyme';
import Waiter from './Waiter.js';

describe('Component Waiter', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<Waiter />);
    expect(component).toBeTruthy();
  });
});
