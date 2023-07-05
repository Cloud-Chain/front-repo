import React, { useState } from 'react';
import { Slider, Typography, TextField } from '@mui/material';

const MileageRangeFilter = () => {
  const [mileageRange, setMileageRange] = useState([0, 300000]); // Initial range: 0 to 1 billion (in kilometers)
  const minMileage = mileageRange[0];
  const maxMileage = mileageRange[1];

  const handleSliderChange = (event, newValue) => {
    setMileageRange(newValue);
  };

  const handleMinMileageChange = (event) => {
    let newMinMileage = parseInt(event.target.value);
    newMinMileage = isNaN(newMinMileage) ? 0 : newMinMileage; // No need to multiply by 1000000 for mileage
    setMileageRange([newMinMileage, mileageRange[1]]);
  };

  const handleMaxMileageChange = (event) => {
    let newMaxMileage = parseInt(event.target.value);
    newMaxMileage = isNaN(newMaxMileage) ? 0 : newMaxMileage; // No need to multiply by 1000000 for mileage
    setMileageRange([mileageRange[0], newMaxMileage]);
  };

  const valueLabelFormat = (value) => {
    const formattedValue = (value / 1000).toFixed(0); // Divide by 1000 and round to 1 decimal place
    return `${formattedValue}KM`;
  };

  return (
    <div
      style={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '95%' }}>
        <Slider
          value={mileageRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="mileage-range-slider"
          min={0}
          max={300000}
          step={1000}
          valueLabelDisplay="on"
          valueLabelFormat={value => valueLabelFormat(value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%'}}>
        <TextField
          label="Minimum Mileage (KM)"
          value={minMileage}
          onChange={handleMinMileageChange}
          type="number"
          size="small"
          style={{ width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: 0, max: maxMileage, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Maximum Mileage (KM)"
          value={maxMileage}
          onChange={handleMaxMileageChange}
          type="number"
          size="small"
          style={{ width:200, marginLeft : 5, marginRight:5 }}
          inputProps={{ min: minMileage, max: 300000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default MileageRangeFilter
