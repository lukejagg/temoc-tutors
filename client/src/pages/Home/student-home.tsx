import * as React from 'react';
import { Navbar } from "../../components/navbar/navbar";
import { StudentCalendar } from './components/student-calendar/student-calendar';
import { Paper, Typography, Box } from '@mui/material';
import "../Home/student-home.css";

export const StudentHome: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return(
    <div className='top-content'>
      <Navbar />

      {/* Calendar and Appointments Render */}
      <div className='container'>
        {/* Calendar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StudentCalendar onDateChange={handleDateChange} />
        </Box>

        {/* Appointments */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selectedDate ? (
            <Typography variant="h4">
              {new Date(selectedDate).toLocaleDateString()}
            </Typography>
          ) : (
            <Typography variant="h4">No date selected</Typography>
          )}
        </Box>
      </div>
    </div>
  );
};
