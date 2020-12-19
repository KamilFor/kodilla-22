import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const Waiter = () => {
  return (
    <BrowserRouter basename={'localhost:3000/panel/waiter'}>
      <Link to={`${process.env.PUBLIC_URL}/order/:id`} activeClassName='active'>
        OrderID
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/order/new`} activeClassName='active'>
        OrderNew
      </Link>
      <h2>Waiter view</h2>
    </BrowserRouter>
  );
};

export default Waiter;
