import React from 'react';
import { shallow } from 'enzyme';
import Tables from './Tables.js';

describe('Component Tables', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<Tables />);
    expect(component).toBeTruthy();
  });
});
