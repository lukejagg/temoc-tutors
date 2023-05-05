import * as React from "react";
import { useEffect } from "react";
import { Navbar } from "../../components/navbar/navbar";
import { Calendar } from './components/calendar/calendar';
import { Typography, Box, Container, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Tooltip } from '@mui/material';
import { StudentAppointments } from './components/student-appointments/student-appointments';
import { TutorAppointmentsCheckRequest } from '../../api/dbEndpointTypes';
import { checkAllTutorAppointmentsCheckRequest, checkTutorAppointmentsCheckRequest, checkTutorTutoredHoursRequest } from '../../api/endpointRequests';
import "../Home/tutor-home.css";
import duration from 'dayjs/plugin/duration';
import dayjs from "dayjs";

interface Props {}

export const TutorHome: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [allAppointments, setAllAppointments] = React.useState<any[]>([]);
  const [tutoredHours, setTutoredHours] = React.useState<number>(0);

  const today = new Date().toISOString().substring(0, 10);
  dayjs.extend(duration);

  const appointmentsRequest = async (date: Date) => {
    const newTutorAppointmentsCheckRequest: TutorAppointmentsCheckRequest = {
      id: localStorage.getItem("userId"),
      date: date.toISOString().substring(0, 10)
    };

    const response = await checkTutorAppointmentsCheckRequest(newTutorAppointmentsCheckRequest);
    console.log(response)
    return response;
  };

  const allTutorAppointments = async () => {
    let idNum = localStorage.getItem('userId');
    
    if (idNum !== null) {
      checkAllTutorAppointmentsCheckRequest(idNum, today).then((response) => {
        setAllAppointments(response)
      });
    }
  };

  const tutorTutoredHoursRequest = async () => {
    let idNum = localStorage.getItem('userId');
    
    if (idNum !== null) {
      checkTutorTutoredHoursRequest(idNum).then((response) => {
        let totalMinutes = 0;
        for (let i = 0; i < response.length; i++) {
          let startTime = dayjs(response[i].time_start, 'HH:mm');
          let endTime = dayjs(response[i].time_end, 'HH:mm');
          totalMinutes += endTime.diff(startTime, 'minute');
        }
        
        let totalHours = totalMinutes / 60;
        setTutoredHours(totalHours);
      });
    }
  };

  useEffect(() => {
    if (selectedDate) {
      appointmentsRequest(selectedDate).then((response) => {
        setAppointments(response);
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    tutorTutoredHoursRequest();
    allTutorAppointments();
  }, []);

  return (
    <div>
      <div className="top-content">
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1>Welcome back! You have tutored for {tutoredHours} hours.</h1>
        </Box>

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

        <Container>
          <Typography variant="h4" sx={{ marginBottom: "30px", textAlign: "center" }}>Upcoming Appointments</Typography>
        </Container>

        <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "700px", margin: "50px auto 0" }}>
          {allAppointments && allAppointments.length > 0 ? (
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {allAppointments.map((appointment) => (
              <ListItem key={appointment.id} sx={{ height: "125px", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ height: "85px", width: "85px", margin: "20px" }}
                    src={appointment.profile_picture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={appointment.username}
                  secondary={"Available Times: " + dayjs(appointment.time_start, 'HH:mm:ss').format('h:mm A') + " - " + dayjs(appointment.time_end, 'HH:mm:ss').format('h:mm A')}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
                <ListItemText
                  primary={appointment.subject.replace(/[{}]/g, "")}
                  secondary={new Date(appointment.date).toLocaleDateString()}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
              </ListItem>
            ))}
          </List>
          ) : (
            <>
              <p>No appointments scheduled</p>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};