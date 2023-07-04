import React, { useState } from 'react';
import { TextField } from '@mui/material'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PeriodRangeFilter = () => {
  const now = dayjs()
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);

  return (
    <div
      style={{
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ flex: 1 }}>
          <DesktopDatePicker
            label="Search start date"
            value={startDate}
            onChange={newValue => setStartDate(newValue)}
            renderInput={params => <TextField {...params} fullWidth
            />}
          />
        </div>
        <div style={{ flex: 1 }}>
          <DesktopDatePicker
            size="small"
            label="Search end date"
            value={endDate}
            onChange={newValue => setEndDate(newValue)}
            renderInput={params => <TextField {...params} fullWidth />}
          />
        </div>
      </LocalizationProvider>
    </div>
  )
}

export default PeriodRangeFilter;
