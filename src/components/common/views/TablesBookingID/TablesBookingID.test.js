import React from 'react';
import { shallow } from 'enzyme';
import TablesBookingID from './TablesBookingID.js';

describe('Component TablesBookingID', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<TablesBookingID />);
    expect(component).toBeTruthy();
  });
});
