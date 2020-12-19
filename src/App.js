import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/common/views/Homepage/Homepage';
import Login from './components/common/views/Login/Login';
import Tables from './components/common/views/Tables/Tables';
import Waiter from './components/common/views/Waiter/Waiter';
import Kitchen from './components/common/views/Kitchen/Kitchen';

function App() {
  return (
    <BrowserRouter basename={'localhost:3000/panel'}>
      <MainLayout>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
          <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
          <Route exact path={process.env.PUBLIC_URL + '/tables'} component={Tables} />
          <Route exact path={process.env.PUBLIC_URL + '/waiter'} component={Waiter} />
          <Route exact path={process.env.PUBLIC_URL + '/Kitchen'} component={Kitchen} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
