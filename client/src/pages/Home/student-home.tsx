import * as React from 'react';
import { Navbar } from "../../components/navbar/navbar";
import { StudentCalendar } from './components/student-calendar/student-calendar';
import { Paper, Typography, Box } from '@mui/material';
import "../Home/student-home.css";

export const StudentHome: React.FC = () => {
  return(
    <div className='top-content'>
      <Navbar />

      {/* Calendar and Appointments Render */}
      <div className='container'>
        {/* Calendar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StudentCalendar />
        </Box>

        {/* Appointments */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
        </Box>
      </div>
    </div>
  );
};
