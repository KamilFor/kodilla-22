import React from 'react';
import { shallow } from 'enzyme';
import WaiterOrderId from './WaiterOrderId.js';

describe('Component WaiterOrderId', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<WaiterOrderId />);
    expect(component).toBeTruthy();
  });
});
