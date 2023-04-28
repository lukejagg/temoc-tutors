import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/navbar/navbar';
import { Alert, Avatar, Box, Button, Container, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { checkAppointmentReservation, checkNewTutorSchedule, checkTutorScheduleExists, deleteTutorScheduleAppointment } from '../../../api/endpointRequests';
import { AppointmentReservation, TutorScheduleAppointment } from '../../../api/dbEndpointTypes';


import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './tutor-confirm.css';

export const TutorConfirm: React.FC= () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [appointment, ] = useState(location.state.appointment);
  const [studentStartTime, setStudentStartTime] = useState<Dayjs | null>(null);
  const [studentEndTime, setStudentEndTime] = useState<Dayjs | null>(null);
  const [formattedStartTime, setFormattedStartTime] = useState<Dayjs>();
  const [formattedEndTime, setFormattedEndTime] = useState<Dayjs>();
  const [studentSelectedSubject, setStudentSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [error, setError] = useState('');
    
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Chicago');
  dayjs.extend(duration);

  const makeNewTutorSchedule = async (tutorScheduleStartTime: string | null, tutorScheduleEndTime: string | null) => {
    const newTutorScheduleAppointment: TutorScheduleAppointment = {
      tutor_id: appointment.tutor_id,
      start_time: tutorScheduleStartTime,
      end_time: tutorScheduleEndTime,
      date: appointment.day
    };

    return await checkNewTutorSchedule(newTutorScheduleAppointment);
  }

  const makeNewTutorScheduleDeletion = async (tutorScheduleStartTime: string | null, tutorScheduleEndTime: string | null) => {
    const newTutorScheduleAppointment: TutorScheduleAppointment = {
      tutor_id: appointment.tutor_id,
      start_time: tutorScheduleStartTime,
      end_time: tutorScheduleEndTime,
      date: appointment.day
    };

    return await deleteTutorScheduleAppointment(newTutorScheduleAppointment);
  }

  const makeCheckTutorScheduleExists = async (tutorScheduleStartTime: string | null, tutorScheduleEndTime: string | null) => {
    const newTutorScheduleAppointment: TutorScheduleAppointment = {
      tutor_id: appointment.tutor_id,
      start_time: tutorScheduleStartTime,
      end_time: tutorScheduleEndTime,
      date: appointment.day
    };

    return await checkTutorScheduleExists(newTutorScheduleAppointment);
  }

  const makeNewAppointmentReservation  = async (appointmentStartTime: string | null, appointmentEndTime: string | null) => {
    const newAppointmentReservation: AppointmentReservation = {
      student_id: localStorage.getItem('userId'),
      tutor_id: appointment.tutor_id,
      start_time: appointmentStartTime,
      end_time: appointmentEndTime,
      date: appointment.day,
      subject: studentSelectedSubject
    };

    return await checkAppointmentReservation(newAppointmentReservation).then((event) => {console.log(event)});
  }

  const checkForDiff = (studentTime: Dayjs, tutorTime: Dayjs) => {
    return dayjs(tutorTime).diff(dayjs(studentTime), 'minute');
  }
  
  const handleConfirm = async () => {
    if((dayjs(studentStartTime).isAfter(dayjs(formattedStartTime))) && (dayjs(studentEndTime).isBefore(dayjs(formattedEndTime)))) {
      const startingTimeDiff = checkForDiff(dayjs(formattedStartTime), dayjs(studentStartTime));
      const endTimeDiff = checkForDiff(dayjs(studentEndTime), dayjs(formattedEndTime));

      if(startingTimeDiff >= 30 && formattedStartTime && studentStartTime) {
        makeCheckTutorScheduleExists(formattedStartTime.format('HH:mm:ss'), studentStartTime.format('HH:mm:ss')).then((response) => {
          if(response === undefined) {
            makeNewTutorSchedule(formattedStartTime.format('HH:mm:ss'), studentStartTime.format('HH:mm:ss'));
          }
        });
      }

      if(endTimeDiff >= 30 && formattedEndTime && studentEndTime) {
        makeCheckTutorScheduleExists(studentEndTime.format('HH:mm:ss'), formattedEndTime.format('HH:mm:ss')).then((response) => {
          if(response === undefined) {
            makeNewTutorSchedule(studentEndTime.format('HH:mm:ss'), formattedEndTime.format('HH:mm:ss'));
          }
        });
      }

      if(formattedStartTime && formattedEndTime) {
        makeNewTutorScheduleDeletion(formattedStartTime.format('HH:mm:ss'), formattedEndTime.format('HH:mm:ss'));
        if(studentStartTime && studentEndTime) {
          makeNewAppointmentReservation(studentStartTime.format('HH:mm:ss'), studentEndTime.format('HH:mm:ss'))
          navigate('/tutorsearch');
        }
      }
    } 
    else if(dayjs(studentStartTime).isAfter(dayjs(formattedStartTime))) {
      const startingTimeDiff = checkForDiff(dayjs(formattedStartTime), dayjs(studentStartTime));

      if(startingTimeDiff >= 30 && formattedStartTime && studentStartTime) {
        makeCheckTutorScheduleExists(formattedStartTime.format('HH:mm:ss'), studentStartTime.format('HH:mm:ss')).then((response) => {
          if(response === undefined) {
            makeNewTutorSchedule(formattedStartTime.format('HH:mm:ss'), studentStartTime.format('HH:mm:ss'));
          }
        });
      }

      if(formattedStartTime && formattedEndTime) {
        makeNewTutorScheduleDeletion(formattedStartTime.format('HH:mm:ss'), formattedEndTime.format('HH:mm:ss'));
        if(studentStartTime && studentEndTime) {
          makeNewAppointmentReservation(studentStartTime.format('HH:mm:ss'), studentEndTime.format('HH:mm:ss'))
          navigate('/tutorsearch');
        }
      }
    } 
    else if(dayjs(studentEndTime).isBefore(dayjs(formattedEndTime))) {
      const endTimeDiff = checkForDiff(dayjs(formattedEndTime), dayjs(studentEndTime));

      if(endTimeDiff >= 30 && formattedEndTime && studentEndTime) {
        makeCheckTutorScheduleExists(formattedEndTime.format('HH:mm:ss'), studentEndTime.format('HH:mm:ss')).then((response) => {
          if(response === undefined) {
            makeNewTutorSchedule(formattedEndTime.format('HH:mm:ss'), studentEndTime.format('HH:mm:ss'));
          }
        });
      }

      if(formattedStartTime && formattedEndTime) {
        makeNewTutorScheduleDeletion(formattedStartTime.format('HH:mm:ss'), formattedEndTime.format('HH:mm:ss'));
        if(studentStartTime && studentEndTime) {
          makeNewAppointmentReservation(studentStartTime.format('HH:mm:ss'), studentEndTime.format('HH:mm:ss'))
          navigate('/tutorsearch');
        }
      }
    }
  }
  
  const handleClearFields = () => {
    setStudentStartTime(null);
    setStudentEndTime(null);
    setStudentSelectedSubject('');
  };

  useEffect(() => {
    setFormattedStartTime(dayjs(appointment.start_time, 'HH:mm:ss'));
    setFormattedEndTime(dayjs(appointment.end_time, 'HH:mm:ss'));
  });

  useEffect(() => {
    const diffInMinutes = dayjs(studentEndTime).diff(dayjs(studentStartTime), 'minute');
 
    const errorMessage = diffInMinutes < 30
      ? 'Need to schedule for at least 30 minutes'
      : '';
        
    setError(errorMessage);
    setShowErrorMessage(errorMessage !== '');

    if (errorMessage !== '') {
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 10000);
    }
  });

  useEffect(() => {
    const subjects = appointment.subjects.substring(1, appointment.subjects.length - 1).split(",");

    setSubjects(subjects);
  });

  return (
    <>
      <Navbar />
      
      <Container className='header-text' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Typography variant="h1" sx={{ textAlign: 'center' }}>Confirm Appointment</Typography>
        <Typography sx={{ textAlign: 'center' }}>Put in your time preferences and subject to confirm your appointment</Typography>
      </Container>


      <Box className="tutor-confirm-bar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Starting Time"
            value={studentStartTime}
            minTime={dayjs(formattedStartTime)}
            maxTime={dayjs(formattedEndTime).subtract(dayjs.duration(29, 'minute'))}
            onChange={(newValue) => setStudentStartTime(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Ending Time"
            value={studentEndTime}
            minTime={dayjs(formattedStartTime).subtract(dayjs.duration(29, 'minute'))}
            maxTime={dayjs(formattedEndTime).add(dayjs.duration(1, 'minute'))}
            onChange={(newValue) => setStudentEndTime(newValue)}
          />
        </LocalizationProvider>

        <FormControl>
          <InputLabel>Subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={studentSelectedSubject}
            label="Subject"
            sx={{ width: '200px', background: 'white' }}
            onChange={(event) => setStudentSelectedSubject(event.target.value as string)}
          >
            {subjects.map(subject => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: "1.5rem" }}>
          {(showErrorMessage) || (studentEndTime === null) || (studentStartTime === null) || (studentSelectedSubject === '')  ? (
            <Button disabled
              sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
              endIcon={<CheckIcon />}
              >
                Confirm
            </Button>
          ) : (
            <Button 
              variant="contained"
              onClick={handleConfirm}
              sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
              endIcon={<CheckIcon />}
            >
              Confirm
            </Button>
          )}

          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
            onClick={handleClearFields}
            endIcon={<ClearIcon />}
          >
            Clear
          </Button>
        </div>
      </Box>
      
      <div style={{maxWidth: "30%", margin: "30px auto 0px"}}>
        {showErrorMessage && (<Alert variant="filled" severity="error">{error}</Alert>)}
      </div>

      <Paper sx={{ padding: "20px", maxHeight: "650px", overflowY: "auto", width: "600px",   margin: "50px auto 0"  }}>
        <List>
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
          </ListItem>
        </List>
      </Paper>
    </>
  );
};
