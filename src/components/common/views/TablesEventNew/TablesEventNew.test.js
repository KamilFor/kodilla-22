import React from 'react';
import { shallow } from 'enzyme';
import TablesEventNew from './TablesEventNew.js';

describe('Component TablesEventNew', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<TablesEventNew />);
    expect(component).toBeTruthy();
  });
});
