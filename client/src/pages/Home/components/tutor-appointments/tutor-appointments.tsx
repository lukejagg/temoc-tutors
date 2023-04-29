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
  student_id: string;
  username: string;
  profile_picture: string;
}

export const TutorAppointments: React.FC<AppointmentProps> = ({ appointments }) => {
  const [tutorAppointments, setTutorAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    if (appointments) {
      setTutorAppointments(appointments);
    }
    
  }, [appointments]);

  return (
    <Paper sx={{ padding: "20px", maxHeight: "650px", overflowY: "auto", width: "600px" }}>
      {tutorAppointments && tutorAppointments.length > 0 ? (
        <List>
          {tutorAppointments.map((appointment) => (
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
                href={`/meet?id1=${appointment.student_id}&id2=${localStorage.getItem("userId")}`}
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
