import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

type CalendarProps = {
  onDateChange: (date: Date | null) => void;
};

export const Calendar: React.FC<CalendarProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const requestAppointments = () => {
    console.log("lol");
  }

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
          onAccept={requestAppointments}
        />
      </LocalizationProvider>
    </div>
  );
};
