import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Navbar } from '../../components/navbar/navbar';

import './tutor-search.css';

export const TutorSearch: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box className="tutor-search-box">
        <TextField
          className="tutor-search-bar"
          label="Search bar 1"
          variant="outlined"
          margin="normal"
        />
        <TextField
          className="tutor-search-bar"
          label="Search bar 2"
          variant="outlined"
          margin="normal"
        />
        <TextField
          className="tutor-search-bar"
          label="Search bar 3"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4285F4', color: '#fff', height: '40px' }}
        >
          Search
        </Button>
      </Box>
    </>
  );
};
