import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';

export const StudentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </LocalizationProvider>
      {selectedDate && (
        <div>
          Selected date: {dayjs(selectedDate).format('YYYY-MM-DD')}
        </div>
      )}
    </div>
  );
};
