import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, TextField, Tooltip } from '@mui/material';
import { Navbar } from '../../components/navbar/navbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import './schedule-submit.css';
import { loadTutorInformation } from '../../api/endpointRequests';
import InfoIcon from '@mui/icons-material/Info';

export const ScheduleSubmit: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);
  const [dayDate, setDayDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [formattedStartTime, setFormattedStartTime] = useState<string | null>(null);
  const [formattedEndTime, setFormattedEndTime] = useState<string | null>(null);
  const [tutorInfo, setTutorInfo] = useState<any>();
  const [open, setOpen] = React.useState(false);
  
  const dateFormat = 'HH:mm:00';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/Chicago');

  const loadTutorInfo = async () => {
    let userId = localStorage.getItem('userId');
    
    if(userId) {
      await loadTutorInformation(userId).then((result) => {
        setTutorInfo(result[0]);
      });
    }
  }

  const handleDateChange = (newValue: Date | null) => {
    setDayDate(newValue);
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
    setDate(formattedDate);
  };

  const handleSubmission = () => {
    setSubmit(true);
  }

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
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

  useEffect(() => {
    loadTutorInfo();
  }, []);

  return (
    <>
      <Navbar />
      <Box className="tutor-schedule-box">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disablePast={true} value={dayDate} onChange={handleDateChange} />
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

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: "0.5rem" }}>
          {startTime && endTime && date ? (
            <>
              <Button 
                variant="contained"
                sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
                onClick={handleSubmission}
                endIcon={<CheckCircleRoundedIcon />}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="contained"
                disabled
                sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
                endIcon={<CheckCircleRoundedIcon />}
              >
                Submit
              </Button>
            </>
          )}
          
        </div>
      </Box>

      {submit && date ? (
        <>
         <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "800px", margin: "50px auto 0" }}>
            <List sx={{ display: "flex", flexDirection: "column" }}>
              <ListItem key={localStorage.getItem('userId')} sx={{ height: "125px", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ height: "85px", width: "85px", margin: "20px" }}
                    src={tutorInfo.profile_picture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={tutorInfo.username}
                  secondary={"Available Times: " + dayjs(formattedStartTime, 'HH:mm:ss').format('h:mm A') + " - " + dayjs(formattedEndTime, 'HH:mm:ss').format('h:mm A')}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
                <ListItemText
                  primary={tutorInfo.subjects.replace(/[{}]/g, "")}
                  secondary={new Date(date).toLocaleDateString()}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
                {tutorInfo.about_me && tutorInfo.about_me !== null ? (
                  <>
                    <Tooltip title="View About Me" aria-label="edit">
                      <IconButton aria-label="edit" onClick={handleEdit}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>About Me</DialogTitle>
                      <DialogContent>
                        {tutorInfo.about_me}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : (
                  <>
                  </>
                )}
              </ListItem>
            </List>
         </Paper>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
};