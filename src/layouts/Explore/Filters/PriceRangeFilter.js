import React, { useState } from 'react';
import { Slider, Typography, TextField } from '@mui/material';

const PriceRangeFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000000]); // Initial range: 0 to 1 billion (in won)
  const minPrice = priceRange[0];
  const maxPrice = priceRange[1];

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinPriceChange = (event) => {
    let newMinPrice = parseInt(event.target.value);
    newMinPrice = isNaN(newMinPrice) ? 0 : newMinPrice * 1000000; // Here, multiplied the value with 1000000
    setPriceRange([newMinPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    let newMaxPrice = parseInt(event.target.value);
    newMaxPrice = isNaN(newMaxPrice) ? 0 : newMaxPrice * 1000000; // Here, multiplied the value with 1000000
    setPriceRange([priceRange[0], newMaxPrice]);
  };

  const valueLabelFormat = value => {
    const units = ['', '만', '억', '조', '경']; // Units in Korean
    let magnitude = 0;

    while (value >= 10000) {
      value /= 10000;
      magnitude++;
    }

    const formattedValue = magnitude >= 2 ? value.toFixed(2) : Math.round(value);
    return `${formattedValue}${units[magnitude]}원`;
  };

  return (
    <div
      style={{
        padding : 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: 800 }}>
        <Typography id="price-range-slider" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
          min={0}
          max={1000000000}
          step={1000000}
          valueLabelDisplay="on"
          valueLabelFormat={value => valueLabelFormat(value)}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', width: 800 }}>
        <TextField
          label="Minimum Price (100만원, ₩)"
          value={minPrice / 1000000}
          onChange={handleMinPriceChange}
          type="number"
          size="small"
          style={{ width: 200 }}
          inputProps={{ min: 0, max: maxPrice / 1000000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Maximum Price (100만원, ₩)"
          value={maxPrice / 1000000}
          onChange={handleMaxPriceChange}
          type="number"
          size="small"
          style={{ width: 200 }}
          inputProps={{ min: minPrice / 1000000, max: 1000000000 / 1000000, step: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
