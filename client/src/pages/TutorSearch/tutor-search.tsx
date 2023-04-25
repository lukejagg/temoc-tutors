import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Navbar } from '../../components/navbar/navbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { checkAppointmentRequest, checkGetSubjects } from '../../api/endpointRequests';
import { TutorResults } from './components/tutor-results';
import { AppointmentRequest } from '../../api/dbEndpointTypes';

import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

import './tutor-search.css';

export const TutorSearch: React.FC = () => {
  const [tutorName, setTutorName] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [formattedStartTime, setFormattedStartTime] = useState<string | null>(null);
  const [formattedEndTime, setFormattedEndTime] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  const dateFormat = 'HH:mm:00';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Chicago');


  // API Calls
  const getSubjects = async () => {
    const response = await checkGetSubjects();
    const subjects = response.map((item: any) => item.subject_type);
    return subjects;
  };

  const getAppointments = async () => {
    const newAppointmentRequest: AppointmentRequest = {
      username: tutorName,
      date: date,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      subject: selectedSubject
    };

    return await checkAppointmentRequest(newAppointmentRequest);
  };

  // Data Handling
  const handleDateChange = (newValue: Date | null) => {
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
    setDate(formattedDate);
  };

  const handleSearch = () => {
    getAppointments()
    .then((response) => setAppointments(response))
  };

  const handleClearFields = () => {
    setTutorName(null);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setSelectedSubject('');
  };

  useEffect(() => {
    getSubjects()
    .then(response => {
      return response;
    })
    .then(data => setSubjects(data))
  }, []);

  useEffect(() => {
    if (startTime) {
      setFormattedStartTime(startTime.format(dateFormat));
    } else {
      setFormattedStartTime(null);
    }
  
    if (endTime) {
      setFormattedEndTime(endTime.format(dateFormat));
    } else {
      setFormattedEndTime(null);
    }
  }, [startTime, endTime]);

  return (
    <>
      <Navbar />
      <Box className="tutor-search-box">
        <TextField
          className="tutor-search-bar"
          label="Tutor Name"
          variant="outlined"
          margin="normal"
          value={tutorName ?? ''}
          onChange={(event) => setTutorName(event.target.value)}
          sx={{marginTop: "0px", marginBottom: "0px"}}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleDateChange} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Starting Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Ending Time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </LocalizationProvider>

        <FormControl>
          <InputLabel>Subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSubject}
            label="Subject"
            sx={{ width: '200px', background: 'white' }}
            onChange={(event) => setSelectedSubject(event.target.value as string)}
          >
            {subjects.map(subject => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: "0.5rem" }}>
          <Button 
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
            endIcon={<SendIcon />}
          >
            Search
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
      
      <TutorResults appointments={appointments} />
    </>
  );
};
