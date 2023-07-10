import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TransactionStatement = ({ transactionData }) => {
  const classes = useStyles();
  const {
    receiptNumber,
    receiptDate,
    assignor,
    assignee,
    transactionDetails,
  } = transactionData;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Transaction Statement
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Receipt Number: {receiptNumber}</Typography>
          <Typography variant="subtitle1">Receipt Date: {receiptDate}</Typography>

          <Typography variant="h6" gutterBottom>
            Assignor Information:
          </Typography>
          <Typography variant="subtitle1">Name: {assignor.name}</Typography>
          <Typography variant="subtitle1">
            Resident Registration Number: {assignor.residentRegistrationNumber}
          </Typography>
          <Typography variant="subtitle1">Phone Number: {assignor.phoneNumber}</Typography>
          <Typography variant="subtitle1">Address: {assignor.address}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Assignee Information:
          </Typography>
          <Typography variant="subtitle1">Name: {assignee.name}</Typography>
          <Typography variant="subtitle1">
            Resident Registration Number: {assignee.residentRegistrationNumber}
          </Typography>
          <Typography variant="subtitle1">Phone Number: {assignee.phoneNumber}</Typography>
          <Typography variant="subtitle1">Address: {assignee.address}</Typography>

          <Typography variant="h6" gutterBottom>
            Transaction Details:
          </Typography>
          <Typography variant="subtitle1">For Sale: {transactionDetails.isForSale}</Typography>
          <Typography variant="subtitle1">
            Vehicle Registration Number: {transactionDetails.vehicleRegistrationNumber}
          </Typography>
          <Typography variant="subtitle1">
            New Vehicle Registration Number: {transactionDetails.newVehicleRegistrationNumber}
          </Typography>
          <Typography variant="subtitle1">
            Vehicle Model Name: {transactionDetails.vehicleModelName}
          </Typography>
          <Typography variant="subtitle1">
            Vehicle Identification Number: {transactionDetails.vehicleIdentificationNumber}
          </Typography>
          <Typography variant="subtitle1">
            Trading Date: {transactionDetails.tradingDate}
          </Typography>
          <Typography variant="subtitle1">
            Trading Amount: {transactionDetails.tradingAmount}
          </Typography>
          <Typography variant="subtitle1">
            Balance Payment Date: {transactionDetails.balancePaymentDate}
          </Typography>
          <Typography variant="subtitle1">
            Car Delivery Date: {transactionDetails.carDeliveryDate}
          </Typography>
          <Typography variant="subtitle1">
            Car Delivery Address: {transactionDetails.carDeliveryAddress}
          </Typography>
          <Typography variant="subtitle1">Mileage: {transactionDetails.mileage}</Typography>
        </Grid>
      </Grid>

      {/* Button to upload transaction statement */}
      <Button variant="contained" color="primary">
        Upload Transaction Statement
      </Button>
    </Paper>
  );
};

export default TransactionStatement;
