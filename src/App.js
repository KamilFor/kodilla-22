import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/common/views/Homepage/Homepage';
import Login from './components/common/views/Login/Login';

function App() {
  return (
    <BrowserRouter basename={'localhost:3000/panel'}>
      <MainLayout>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
          <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
