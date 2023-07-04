import React, { useState } from 'react';
import { Slider, Typography, TextField } from '@mui/material';

const MileageRangeFilter = () => {
  const [mileageRange, setMileageRange] = useState([0, 1000000000]); // Initial range: 0 to 1 billion (in kilometers)
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

  const valueLabelFormat = value => {
    const units = ['', '만', '억', '조', '경']; // Units in Korean
    let magnitude = 0;

    while (value >= 10000) {
      value /= 10000;
      magnitude++;
    }

    const formattedValue = magnitude >= 2 ? value.toFixed(2) : Math.round(value);
    return `${formattedValue}${units[magnitude]}KM`;
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
      <div style={{ width: 800 }}>
        <Typography id="mileage-range-slider" gutterBottom>
          Mileage Range
        </Typography>
        <Slider
          value={mileageRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="mileage-range-slider"
          min={0}
          max={300000}
          step={1}
          valueLabelDisplay="on"
          valueLabelFormat={value => valueLabelFormat(value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 800 }}>
        <TextField
          label="Minimum Mileage (KM)"
          value={minMileage}
          onChange={handleMinMileageChange}
          type="number"
          size="small"
          style={{ width: 200 }}
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
          style={{ width: 200 }}
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
