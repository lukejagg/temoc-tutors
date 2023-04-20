import * as React from "react";
import { Navbar } from "../../components/navbar/navbar";
import { Calendar } from './components/calendar/calendar';
import { Typography, Box } from '@mui/material';
import { StudentAppointments } from './components/student-appointments/student-appointments';
import { StudentAppointmentsCheckRequest } from '../../api/dbEndpointTypes';
import "../Home/student-home.css";
import { checkStudentAppointmentsCheckRequest } from '../../api/endpointRequests';

export const StudentHome: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const appointmentsRequest = async (date: Date) => {
    const newAppointmentsRequest: StudentAppointmentsCheckRequest = {
      id: localStorage.getItem("id"),
      date: date
    };

    return await checkStudentAppointmentsCheckRequest(newAppointmentsRequest);
  };

  return(
    <div>
      <div className="top-content">
        <Navbar />
        <div className="container">
          {/* Calendar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Calendar
              onDateChange={(date: Date | null) => setSelectedDate(date)}
            />
          </Box>

          {/* Appointments */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedDate ? (
              <Typography variant="h4">
                {new Date(selectedDate).toLocaleDateString()}
                {/* {appointmentsRequest(selectedDate)} */}
                <StudentAppointments />
              </Typography>
            ) : (
              <Typography variant="h4">
                <StudentAppointments />
                No date selected
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};
