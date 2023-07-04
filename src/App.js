import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ThemeProvider,} from '@mui/styles';
import { createTheme } from "@mui/material";
import './app.css'

import SearchDashboard from './layouts/Explore/SearchDashboard';
import TransactionStatement from "./layouts/Transactions/TransactionStatement";
import Sidebar from "./components/Sidebar/Sidebar";

const carData = [
  {
    id: 1,
    transactionDate: '2023-07-01',
    name: 'Car A',
    amount: 5000,
    distanceDriven: '50,000 miles',
  },
  {
    id: 2,
    transactionDate: '2023-06-28',
    name: 'Car B',
    amount: 8000,
    distanceDriven: '80,000 miles',
  },
  // Add more car objects as needed
];
const transactionData = {
  receiptNumber: 'receipt number',
  receiptDate: 'receipt date',
  assignor: {
    name: 'assignor name',
    residentRegistrationNumber: 'assignor RRN',
    phoneNumber: 'assignor phone number',
    address: 'assignor address',
  },
  assignee: {
    name: 'assignee name',
    residentRegistrationNumber: 'assignee RRN',
    phoneNumber: 'assignee phone number',
    address: 'assignee address',
  },
  transactionDetails: {
    isForSale: 'whether for sale',
    vehicleRegistrationNumber: 'vehicle registration number',
    newVehicleRegistrationNumber: 'new vehicle registration number',
    vehicleModelName: 'Vehicle type and name',
    vehicleIdentificationNumber: 'Vehicle Identification Number',
    tradingDate: 'trading date',
    tradingAmount: 'Trading amount',
    balancePaymentDate: 'balance payment date',
    carDeliveryDate: 'car delivery date',
    carDeliveryAddress: 'car delivery location',
    mileage: 'mileage',
  },
};

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Sidebar/>
        <div className="content">
          <Routes>
            <Route exact path={"/explore"} element={<SearchDashboard cars={carData}/>} />
            <Route exact path={"/specs"} element={<TransactionStatement transactionData={transactionData}/>} />

          </Routes>
        </div>
      </div>
    </ThemeProvider>

  );
};

export default App;
/*
https://tech.youha.info/42402700-40cb-43b9-b683-38276f144243
https://www.syncfusion.com/blogs/post/new-react-query-builder-ui-component.aspx
https://marmelab.com/react-admin/doc/3.19/List.html
react query
react select
검색 내용
접수 번호
assignor 이름
assignee 이름
상세 carState
차종 및 차명
매매 금액
주행거리

 */