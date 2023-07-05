import React from 'react';
import {makeStyles} from '@mui/styles'
import FilterForm from './FilterForm'
import GridComponent from './GridComponent'

const SearchDashboard = ( ) => {

  return (
    <div>
      <FilterForm/>
      <GridComponent/>
    </div>
  );
};

export default SearchDashboard;