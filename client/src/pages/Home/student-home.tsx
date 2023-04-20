import * as React from 'react';
import { Navbar } from "../../components/navbar/navbar";
import { Calendar } from './components/calendar/calendar';
import { Typography, Box } from '@mui/material';
import { StudentAppointments } from './components/student-appointments/student-appointments';
import "../Home/student-home.css";

export const StudentHome: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return(
    <div>
      <div className='top-content'>
        <Navbar />
        <div className='container'>
        
          {/* Calendar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Calendar onDateChange={(date: Date | null) => setSelectedDate(date)} />
          </Box>

          {/* Appointments */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {selectedDate ? (
              <Typography variant="h4">
                <StudentAppointments />
                {new Date(selectedDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography variant="h4">No date selected</Typography>
            )}
          </Box>

        </div>
      </div>
    </div>
    
  );
};
