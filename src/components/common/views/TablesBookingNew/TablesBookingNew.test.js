import React from 'react';
import { shallow } from 'enzyme';
import TablesBookingNew from './TablesBookingNew.js';

describe('Component TablesBookingNew', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<TablesBookingNew />);
    expect(component).toBeTruthy();
  });
});
