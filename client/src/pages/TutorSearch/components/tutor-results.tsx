import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { AppointmentValidityCheck, IdForTutorProfilePicture } from '../../../api/dbEndpointTypes';
import { checkAppointmentValidityCheck, checkIdForTutorProfilePicture, getTutorAvatarUrl } from '../../../api/endpointRequests';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { blue } from '@mui/material/colors';
import { AllTutors } from './tutor-default-result';
import dayjs from 'dayjs';
import { alignProperty } from '@mui/material/styles/cssUtils';

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
  profile_picture: any | undefined;
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
    <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "800px", margin: "50px auto 0" }}>
    {studentAppointments && studentAppointments.length > 0 ? (
      <>
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
                secondary={"Available Times: " + dayjs(appointment.start_time, 'HH:mm:ss').format('h:mm A') + " - " + dayjs(appointment.end_time, 'HH:mm:ss').format('h:mm A')}
                sx={{ width: '100%', textAlign: 'left' }}
              />
              <ListItemText
                primary={appointment.subjects.replace(/[{}]/g, "")}
                secondary={new Date(appointment.day).toLocaleDateString()}
                sx={{ width: '100%', textAlign: 'left' }}
              />
              <IconButton aria-label="make-appointment" onClick={() => handleScheduling(appointment)}>
                <AddCircleRoundedIcon fontSize="large" sx={{color: primary}} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </>
    ) : (
      <>
        <p>No tutors found, here is a list of our tutors</p>
        <AllTutors />
      </>
    )}
  </Paper>
  );
};
