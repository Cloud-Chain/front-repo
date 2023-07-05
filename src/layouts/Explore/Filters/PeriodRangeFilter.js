import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker, TextFieldProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PeriodRangeFilter = () => {
  const now = dayjs();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <div style={{ display: 'flex', gap: 30 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Search start date"
            value={startDate}
            onChange={newValue => setStartDate(newValue)}
          >
            {({ inputRef, inputProps }: TextFieldProps) => (
              <TextField
                {...inputProps}
                inputRef={inputRef}
                fullWidth
              />
            )}
          </DesktopDatePicker>
          <DesktopDatePicker
            label="Search end date"
            value={endDate}
            onChange={newValue => setEndDate(newValue)}
          >
            {({ inputRef, inputProps }: TextFieldProps) => (
              <TextField
                {...inputProps}
                inputRef={inputRef}
                fullWidth
              />
            )}
          </DesktopDatePicker>
        </LocalizationProvider>
      </div>
    </Box>
  );
};

export default PeriodRangeFilter;
