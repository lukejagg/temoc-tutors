import React, { useEffect, useState } from 'react';
import { Navbar } from '../../../components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import './tutor-confirm.css';

export const TutorConfirm: React.FC= () => {
  const location = useLocation();
  const [appointment, ] = useState(location.state.appointment);
  
  return (
    <>
      <Navbar />
      
      
    </>
  );
};
