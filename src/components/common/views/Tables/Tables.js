import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const Tables = () => {
  return (
    <BrowserRouter basename={'localhost:3000/panel/tables'}>
      <Link to={`${process.env.PUBLIC_URL}/booking/:id`} activeClassName='active'>
        Booking
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/booking/new`} activeClassName='active'>
        BookingNew
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/events/:id`} activeClassName='active'>
        EventsID
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/events/new`} activeClassName='active'>
        EventsNew
      </Link>
      <h2>Tables view</h2>
    </BrowserRouter>
  );
};

export default Tables;
