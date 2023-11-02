import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ThemeProvider,} from '@mui/styles';
import { createTheme } from "@mui/material";
import './app.css'
import InfraSidebar from 'components/InfraSidebar/InfraSidebar';
import Blockchain from 'layouts/Blockchain/Blockchain';
import Dashboard from 'layouts/Main/Dashboard';
import Cluster from 'layouts/Cluster/Cluster';
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <InfraSidebar/>
        <div className="content">
          <Routes>
            <Route index element={< Dashboard/>} />
            <Route path="/cluster" element={< Cluster/>} />
            <Route path="/blockchain" element={< Blockchain/>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;