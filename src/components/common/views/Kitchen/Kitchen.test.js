import React from 'react';
import { shallow } from 'enzyme';
import Kitchen from './Kitchen.js';

describe('Component Kitchen', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<Kitchen />);
    expect(component).toBeTruthy();
  });
});
