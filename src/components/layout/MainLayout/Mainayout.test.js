import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './MainLayout.js';

describe('Component MainLayout', () => {
  // Test 1
  it('should render without crashing', () => {
    const component = shallow(<MainLayout />);
    expect(component).toBeTruthy();
  });
});
