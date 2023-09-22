import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ThemeProvider,} from '@mui/styles';
import { createTheme } from "@mui/material";
import CarDetailComponent from './layouts/CarDetails/CarDetailComponent'
import SellCar from './layouts/Transaction/SellCar'
import SearchDashboard from './layouts/CarList/SearchDashboard';
import Sidebar from "./components/Sidebar/Sidebar";
import './app.css'
import Profile from "./layouts/Profile/Profile"
import SignIn from "./layouts/Profile/SignIn";
import SignUp from "./layouts/Profile/SignUp";
import Album from "./layouts/Main/Album";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Sidebar/>
        <div className="content">
          <Routes>
            <Route exact path="/home" element={< Album/>} />
            <Route exact path={"/buy"} element={<SearchDashboard />} />
            <Route exact path={"/sell"} element={<SellCar />} />
            <Route path="/buy/:id" element={< CarDetailComponent/>} />
            <Route exact path="/profile" element={< Profile/>} />
            <Route exact path="/signin" element={< SignIn/>} />
            <Route exact path="/signup" element={< SignUp/>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>

  );
};

export default App;