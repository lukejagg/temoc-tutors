import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../../components/navbar/navbar';
import { Avatar, Box, Button, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { checkGetSubjects } from '../../../api/endpointRequests';


import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import './tutor-confirm.css';

export const TutorConfirm: React.FC= () => {
  const location = useLocation();

  const [appointment, ] = useState(location.state.appointment);
  const [studentStartTime, setStudentStartTime] = useState<Dayjs | null>(null);
  const [studentEndTime, setStudentEndTime] = useState<Dayjs | null>(null);
  const [formattedStartTime, setFormattedStartTime] = useState<string | null>(null);
  const [formattedEndTime, setFormattedEndTime] = useState<string | null>(null);
  const [studentSelectedSubject, setStudentSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);

  const dateFormat = 'HH:mm:00';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Chicago');

  const handleConfirm = async () => {

  }

  const getSubjects = async () => {
    const response = await checkGetSubjects();
    const subjects = response.map((item: any) => item.subject_type);
    return subjects;
  };

  const handleClearFields = () => {
    setStudentStartTime(null);
    setStudentEndTime(null);
    setStudentSelectedSubject('');
  };

  useEffect(() => {
    if (studentStartTime) {
      setFormattedStartTime(studentStartTime.format(dateFormat));
    } else {
      setFormattedStartTime(null);
    }
  
    if (studentEndTime) {
      setFormattedEndTime(studentEndTime.format(dateFormat));
    } else {
      setFormattedEndTime(null);
    }
  }, [studentStartTime, studentEndTime]);

  useEffect(() => {
    getSubjects()
    .then(response => {
      return response;
    })
    .then(data => setSubjects(data))
  }, []);

  return (
    <>
      <Navbar />
      
      <Box className="tutor-confirm-bar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Starting Time"
            value={studentStartTime}
            onChange={(newValue) => setStudentStartTime(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Ending Time"
            value={studentEndTime}
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
          <Button 
            variant="contained"
            onClick={handleConfirm}
            sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
            endIcon={<SendIcon />}
          >
            Confirm
          </Button>

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
              secondary={appointment.start_time.slice(0, -3) + " - " + appointment.end_time.slice(0, -3)}
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
