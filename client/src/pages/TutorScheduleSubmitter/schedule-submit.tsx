import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Navbar } from '../../components/navbar/navbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import './schedule-submit.css';
import { checkConfirmationSend, loadTutorInformation } from '../../api/endpointRequests';
import InfoIcon from '@mui/icons-material/Info';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ConfirmationSubmissionSchedule } from '../../api/dbEndpointTypes';

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
  const [errorAlert, setErrorAlert] = React.useState<boolean | null>(null);
  const [sendSuccess, setSendSucces] = React.useState<boolean>(false);
  
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

  const handleConfirmationSend = async () => {
    const newConfirmationSubmissionSchedule: ConfirmationSubmissionSchedule = {
      id: localStorage.getItem('userId'),
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      day: date
    };

    return await checkConfirmationSend(newConfirmationSubmissionSchedule).then((response) => {
      setErrorAlert(response);
      if(errorAlert) {
        setSendSucces(true);
      }
    });
  }

  const handleDateChange = (newValue: Date | null) => {
    setDayDate(newValue);
    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
    setDate(formattedDate);
  };


  const handleSubmission = () => {
    setSubmit(true);
    setErrorAlert(true);
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

  useEffect(() => {
    if (!errorAlert) {
      setSendSucces(false);
    }
    // if (sendSuccess) {
    //   setErrorAlert(false);
    // }
  }, [errorAlert, sendSuccess]);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "85px", fontSize: "48px",
          fontWeight: "bold", color: "black", textAlign: "center"}}>
        <h1>Submit Schedule</h1>
      </Box>

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
          <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "950px", margin: "50px auto 0" }}>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton aria-label="edit" onClick={handleConfirmationSend}>
                <Typography variant="button" color="inherit">
                  Confirm
                </Typography>
                <SendRoundedIcon />
              </IconButton>
            </div>
            {!errorAlert && (<Alert variant="filled" severity="error">"Selected times interfere with other appointments and/or schedule"</Alert>)}
            {sendSuccess && (<Alert variant="filled" severity="success">"Schedule has been set"</Alert>)}
          </Paper>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
};