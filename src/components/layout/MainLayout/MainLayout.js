import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
