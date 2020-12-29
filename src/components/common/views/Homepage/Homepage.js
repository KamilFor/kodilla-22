import React from 'react';
import PropType from 'prop-types';
// Import Material-IU
// import Table
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// List import
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

const order = [{ id: 1, type: 'Local', amount: 4 }, { id: 2, type: 'Online', amount: 7 }];

const list = [
  {
    id: 1,
    type: 'Reservation',
    orders: [
      {
        id: 1,
        name: 'PAX',
        table: 2,
        time: 16,
        numberOfPeople: 2,
      },
      {
        id: 2,
        name: 'PAX',
        table: 3,
        time: 12,
        numberOfPeople: 4,
      },
      {
        id: 3,
        name: 'PAX',
        table: 1,
        time: 14,
        numberOfPeople: 1,
      },
    ],
  },
  {
    id: 2,
    type: 'Events',
    orders: [
      {
        id: 1,
        name: 'PAX',
        table: 4,
        time: 15,
        numberOfPeople: 7,
      },
      {
        id: 2,
        name: 'PAX',
        table: 'all',
        time: 13,
        numberOfPeople: 12,
      },
    ],
  },
];

const Homepage = () => {
  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Zamówienie</TableCell>
            <TableCell>Ilość</TableCell>
            <TableCell>Dodaj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row) => {
            const { id, type, amount } = row;
            return (
              <TableRow key={id}>
                <TableCell>{type}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>
                  <Button>+ADD</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <List>
        {list.map((row) => {
          const { id, type, orders } = row;
          return (
            <ListSubheader key={id}>
              {type}
              {orders.map((row) => {
                const { id, name } = row;
                return (
                  <ListItem key={id}>
                    <ListItemIcon>
                      <Checkbox edge='start' disableRipple />
                      {name} <br />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </ListSubheader>
          );
        })}
      </List>
    </Paper>
  );
};

Homepage.propType = {
  order: PropType.array,
};

export default Homepage;
