import * as React from "react";
import { useEffect } from "react";
import { Navbar } from "../../components/navbar/navbar";
import { Calendar } from './components/calendar/calendar';
import { Typography, Box } from '@mui/material';
import { StudentAppointments } from './components/student-appointments/student-appointments';
import { TutorAppointmentsCheckRequest } from '../../api/dbEndpointTypes';
import { checkTutorAppointmentsCheckRequest } from '../../api/endpointRequests';
import "../Home/tutor-home.css";

interface Props {}

export const TutorHome: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [appointments, setAppointments] = React.useState<any[]>([]);

  const appointmentsRequest = async (date: Date) => {
    const newTutorAppointmentsCheckRequest: TutorAppointmentsCheckRequest = {
      id: localStorage.getItem("userId"),
      date: date.toISOString().substring(0, 10)
    };

    const response = await checkTutorAppointmentsCheckRequest(newTutorAppointmentsCheckRequest);
    return response;
  };

  useEffect(() => {
    if (selectedDate) {
      appointmentsRequest(selectedDate).then((response) => {
        setAppointments(response);
      });
    }
  }, [selectedDate]);

  return (
    <div>
      <div className="top-content">
        <Navbar />
        <div className="container">
          {/* Calendar */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Calendar onDateChange={(date: Date | null) => setSelectedDate(date)} />
          </Box>

          {/* Appointments */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {selectedDate ? (
              appointments ? (
                <StudentAppointments appointments={appointments} />
              ) : (
                <Typography variant="h4">No appointments scheduled on this day</Typography>
              )
            ) : (
              <Typography variant="h4">No date selected</Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};