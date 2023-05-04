import * as React from "react";
import { useState, useEffect } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from "@mui/material";
import dayjs from "dayjs";

interface AppointmentProps {
  appointments: any[] | null;
}

interface Appointment {
  id: string;
  time_start: Date;
  time_end: Date;
  tutor_id: string;
  username: string;
  profile_picture: string;
}

export const StudentAppointments: React.FC<AppointmentProps> = ({ appointments }) => {
  const [studentAppointments, setStudentAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    if (appointments) {
      setStudentAppointments(appointments);
      console.log(studentAppointments)
    }
    
  }, [appointments]);

  return (
    <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "700px", margin: "50px auto 0" }}>
      {studentAppointments && studentAppointments.length > 0 ? (
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {studentAppointments.map((appointment) => (
            <ListItem key={appointment.id} sx={{ height: "125px", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <ListItemAvatar>
                <Avatar
                  sx={{ height: "85px", width: "85px", margin: "20px" }}
                  src={appointment.profile_picture}
                />
              </ListItemAvatar>
              <ListItemText
                primary={appointment.username}
                secondary={`${dayjs(appointment.time_start, 'HH:mm:ss').format('hh:mm A')} - ${dayjs(appointment.time_end, 'HH:mm:ss').format('hh:mm A')}`}
                sx={{ width: '100%', textAlign: 'left' }}
              />
              <ListItemButton
                sx={{ height: "25%", width: "25%" }}
                component="a"
                href={`/meet?id1=${localStorage.getItem("userId")}&id2=${appointment.tutor_id}`}
              >
                Join
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No appointments found</p>
      )}
    </Paper>
  );
};
