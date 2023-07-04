import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {makeStyles} from '@mui/styles'
import FilterForm from './FilterForm'

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
    maxWidth: 800,
    margin: '0 auto',
  },
});

const SearchDashboard = ({ cars }) => {

  const classes = useStyles();

  return (
    <div>
      <FilterForm/>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Distance Driven</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.transactionDate}</TableCell>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.amount}</TableCell>
                <TableCell>{car.distanceDriven}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchDashboard;
