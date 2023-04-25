import React from 'react';
import { Dayjs } from 'dayjs';
import { Box, Typography } from '@mui/material';

interface Props {
  tutorName: string | null;
  date: string | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  selectedSubject: string | null;
}

export const TutorResults: React.FC<Props> = ({ tutorName, date, startTime, endTime, selectedSubject }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px' }}>Tutor Results</Typography>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>Tutor Name: {tutorName ?? '-'}</Typography>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>Date: {date ?? '-'}</Typography>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>Start Time: {startTime ? startTime.format('hh:mm A') : '-'}</Typography>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>End Time: {endTime ? endTime.format('hh:mm A') : '-'}</Typography>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>Selected Subject: {selectedSubject ?? '-'}</Typography>
      </Box>
    </Box>
  );
};
