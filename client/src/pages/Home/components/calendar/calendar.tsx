import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';

type Calendar = {
  onDateChange: (date: Date | null) => void;
};

export const Calendar: React.FC<Calendar> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    props.onDateChange(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
      </LocalizationProvider>
    </div>
  );
};
