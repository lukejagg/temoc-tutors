import * as React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { useState } from "react";

export const StudentAppointments: React.FC = () => {
  const [studentAppointments, setStudentAppointments] = useState([
    { id: 1, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10am", endDate: "12pm", },
    { id: 2, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12pm", endDate: "2pm",},
    { id: 3, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2pm", endDate: "4pm",},
    { id: 4, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4pm", endDate: "6pm",},
    { id: 5, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6pm", endDate: "8pm",},
    { id: 6, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8pm", endDate: "10pm",},
    { id: 7, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10pm", endDate: "12am",},
    { id: 8, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12am", endDate: "2am",},
    { id: 9, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2am", endDate: "4am",},
    { id: 10, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4am", endDate: "6am",},
    { id: 11, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6am", endDate: "8am",},
    { id: 12, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8am", endDate: "10am",},
    { id: 13, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10am", endDate: "12pm", },
    { id: 14, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12pm", endDate: "2pm",},
    { id: 15, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2pm", endDate: "4pm",},
    { id: 16, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4pm", endDate: "6pm",},
    { id: 17, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6pm", endDate: "8pm",},
    { id: 18, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8pm", endDate: "10pm",},
    { id: 19, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10pm", endDate: "12am",},
    { id: 20, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12am", endDate: "2am",},
    { id: 21, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2am", endDate: "4am",},
    { id: 22, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4am", endDate: "6am",},
    { id: 23, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6am", endDate: "8am",},
    { id: 24, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8am", endDate: "10am",},
    { id: 25, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10am", endDate: "12pm", },
    { id: 26, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12pm", endDate: "2pm",},
    { id: 27, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2pm", endDate: "4pm",},
    { id: 28, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4pm", endDate: "6pm",},
    { id: 29, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6pm", endDate: "8pm",},
    { id: 30, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8pm", endDate: "10pm",},
    { id: 31, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10pm", endDate: "12am",},
    { id: 32, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12am", endDate: "2am",},
    { id: 33, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2am", endDate: "4am",},
    { id: 34, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4am", endDate: "6am",},
    { id: 35, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6am", endDate: "8am",},
    { id: 36, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8am", endDate: "10am",},
    { id: 37, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10am", endDate: "12pm", },
    { id: 38, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12pm", endDate: "2pm",},
    { id: 39, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2pm", endDate: "4pm",},
    { id: 40, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4pm", endDate: "6pm",},
    { id: 41, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6pm", endDate: "8pm",},
    { id: 42, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8pm", endDate: "10pm",},
    { id: 43, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "10pm", endDate: "12am",},
    { id: 44, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "12am", endDate: "2am",},
    { id: 45, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "2am", endDate: "4am",},
    { id: 46, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "4am", endDate: "6am",},
    { id: 47, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "6am", endDate: "8am",},
    { id: 48, profilePic: "tutor1.png", subject: "Math", tutorName: "Norman Gongor", startDate: "8am", endDate: "10am",},
  ]);

  return (
    <Paper sx={{ padding: "20px", maxHeight: "650px", overflowY: "auto", width: "600px" }}>
      <List>
        {studentAppointments &&
          studentAppointments.map((studentAppointment) => (
            <ListItem key={studentAppointment.id} sx={{ height: "125px", alignSelf: "flex-start" }}>
              <ListItemAvatar>
                <Avatar sx={{ height: "85px", width: "85px", margin: "20px" }}
                  alt="Serial Killer"
                  src={require(`../../img/${studentAppointment.profilePic}`)}
                  />
              </ListItemAvatar>
              <ListItemText
                primary={studentAppointment.subject + " w/ " + studentAppointment.tutorName}
                secondary={studentAppointment.startDate + " - " + studentAppointment.endDate}
                />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};
