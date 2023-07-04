import React from 'react';
import { Paper, Grid, Divider } from '@mui/material';
import PeriodRangeFilter from './Filters/PeriodRangeFilter'
import PriceRangeFilter from './Filters/PriceRangeFilter'
import MileageRangeFilter from './Filters/MileageRangeFilter'

const FilterForm = () => {
  return (
    <Paper
      style={{
        margin: 40,
        padding: 10,
      }}
      elevation={3} // Add a slight shadow
    >
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <PeriodRangeFilter />
        </Grid>
        <Divider
          sx={{
            width: '100%',
            height: '0.5px',
            backgroundColor: '#D3D3D3'
          }}
          orientation="horizontal"
        />
        <Grid item>
          <PriceRangeFilter />
        </Grid>
        <Divider
          sx={{
            width: '100%',
            height: '0.5px',
            backgroundColor: '#D3D3D3',
          }}
          orientation="horizontal"
        />
        <Grid item>
          <MileageRangeFilter />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterForm;
