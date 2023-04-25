import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Navbar } from '../../components/navbar/navbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { checkGetSubjects } from '../../api/endpointRequests';
import './tutor-search.css';

export const TutorSearch: React.FC = () => {
  const [tutorName, setTutorName] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  // API Calls
  const getSubjects = async () => {
    const response = await checkGetSubjects();
    const subjects = response.map((item: any) => item.subject_type);
    return subjects;
  };

  // Data Handling
  const handleDateChange = (newValue: Date | null) => {
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
    setDate(formattedDate);
  };

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
      <Box className="tutor-search-box">
        <TextField
          className="tutor-search-bar"
          label="Tutor Name"
          variant="outlined"
          margin="normal"
          value={tutorName ?? ''}
          onChange={(event) => setTutorName(event.target.value)}
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

        <Button variant="contained" sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}>
          Search
        </Button>
      </Box>
    </>
  );
};
