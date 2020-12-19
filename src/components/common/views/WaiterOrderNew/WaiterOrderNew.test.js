import React from 'react';
import { shallow } from 'enzyme';
import WaiterOrderNew from './WaiterOrderNew.js';

describe('Component WaiterOrderNew', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<WaiterOrderNew />);
    expect(component).toBeTruthy();
  });
});
