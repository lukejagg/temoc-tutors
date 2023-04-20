import * as React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useState } from "react";

export const StudentAppointments: React.FC = () => {
  const [studentAppointments, setStudentAppointments] = useState([
    {
      id: 1,
      firstName: "Frank",
      lastName: "Murphy",
      email: "frank.murphy@test.com",
      role: "User",
    },
    {
      id: 2,
      firstName: "Vic",
      lastName: "Reynolds",
      email: "vic.reynolds@test.com",
      role: "Admin",
    },
    {
      id: 3,
      firstName: "Gina",
      lastName: "Jabowski",
      email: "gina.jabowski@test.com",
      role: "Admin",
    },
    {
      id: 4,
      firstName: "Jessi",
      lastName: "Glaser",
      email: "jessi.glaser@test.com",
      role: "User",
    },
    {
      id: 5,
      firstName: "Jay",
      lastName: "Bilzerian",
      email: "jay.bilzerian@test.com",
      role: "User",
    },
  ]);

  return (
    <Paper>
      <List>
        {studentAppointments &&
          studentAppointments.map((studentAppointment) => (
            <ListItem key={studentAppointment.id}>
              <ListItemText primary="Single-line item" />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};
