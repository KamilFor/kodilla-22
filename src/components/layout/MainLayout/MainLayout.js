import React, { Component } from 'react';
import PropTypes from 'prop-types';

// PageNav
import PageNav from '../PageNav/PageNav';
class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <PageNav />
        <div>{children}</div>;
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
