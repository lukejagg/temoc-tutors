import React, { useEffect, useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';

interface AppointmentProps{
  appointments: any[] | null;
}
interface Appointment {
  id: string;
  username: string;
  day: string;
  start_time: string;
  end_time: string;
  subjects: string;
  profile_picture: string;
}

export const TutorResults: React.FC<AppointmentProps> = ({ appointments }) => {
  const [studentAppointments, setStudentAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    if (appointments) {
      setStudentAppointments(appointments);
    } else {
      setStudentAppointments(null);
    }
    
  }, [appointments]);

  return (
    <Paper sx={{ padding: "20px", maxHeight: "650px", overflowY: "auto", width: "600px",   margin: "50px auto 0"  }}>
      {studentAppointments && studentAppointments.length > 0 ? (
        <List>
          {studentAppointments.map((appointment) => (
            <ListItem key={appointment.id} sx={{ height: "125px", alignSelf: "flex-start" }}>
              <ListItemAvatar>
                <Avatar
                  sx={{ height: "85px", width: "85px", margin: "20px" }}
                  src={appointment.profile_picture}
                />
              </ListItemAvatar>
              <ListItemText
                primary={appointment.username}
                secondary={appointment.start_time + " - " + appointment.end_time}
              />
              <ListItemText
                primary={appointment.subjects.replace(/[{}]/g, "")}
                secondary={new Date(appointment.day).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No Tutors</p>
      )}
    </Paper>
  );
};
