import * as React from "react";
import { useState, useEffect } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from "@mui/material";

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
    }
    
  }, [appointments]);

  return (
    <Paper sx={{ padding: "20px", maxHeight: "650px", overflowY: "auto", width: "600px" }}>
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
                secondary={appointment.time_start + " - " + appointment.time_end}
              />
              <ListItemButton
                sx={{ height: "100%", width: "100%" }}
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
