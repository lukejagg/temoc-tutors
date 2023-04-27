import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { AppointmentValidityCheck } from '../../../api/dbEndpointTypes';
import { checkAppointmentValidityCheck } from '../../../api/endpointRequests';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { blue } from '@mui/material/colors';

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
  const [studentId, ] = useState(localStorage.getItem('userId'));
  const [studentAppointments, setStudentAppointments] = useState<Appointment[] | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  
  const primary = blue[500];

  const navigate = useNavigate();

  const handleScheduling = async (appointment: Appointment) => {
    const newAppointmentValidityCheck: AppointmentValidityCheck = {
      id: studentId,
      date: appointment.day.slice(0, 10),
      start_time: appointment.start_time,
      end_time: appointment.end_time
    };

    await checkAppointmentValidityCheck(newAppointmentValidityCheck)
    .then((response) => {
      if(response !== null) {
        setSelectedAppointment(appointment);
        navigate('/confirmation/appointment', { state: { appointment } });
      }
    });
  };

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
                secondary={"Available Times: " + appointment.start_time.slice(0, -3) + " - " + appointment.end_time.slice(0, -3)}
              />
              <ListItemText
                primary={appointment.subjects.replace(/[{}]/g, "")}
                secondary={new Date(appointment.day).toLocaleDateString()}
              />
              <IconButton aria-label="make-appointment" onClick={() => handleScheduling(appointment)}>
                <AddCircleRoundedIcon fontSize="large" sx={{color: primary}} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No Tutors</p>
        )}
    </Paper>
  );
};
