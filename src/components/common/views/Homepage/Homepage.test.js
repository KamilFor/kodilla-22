import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './Homepage.js';

describe('Component Homepage', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<Homepage />);
    expect(component).toBeTruthy();
  });
});
