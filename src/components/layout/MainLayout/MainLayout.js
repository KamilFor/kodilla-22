import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// PageNav
import PageNav from '../PageNav/PageNav';
class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <AppBar>
          <Container maxWidth='lg'>
            <Toolbar disableGutters>
              <PageNav />
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth='lg'>
          <Toolbar />
          {children}
        </Container>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
