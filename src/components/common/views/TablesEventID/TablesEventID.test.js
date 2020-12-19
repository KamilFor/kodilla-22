import React from 'react';
import { shallow } from 'enzyme';
import TablesEventID from './TablesEventID.js';

describe('Component TablesEventID', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<TablesEventID />);
    expect(component).toBeTruthy();
  });
});
