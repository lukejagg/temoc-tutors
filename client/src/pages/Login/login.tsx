import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Alert } from '@mui/material';
import { LoginRequest } from '../../api/dbEndpointTypes';
import { checkLoginRequest } from '../../api/endpointRequests';
import backgroundImage from "./img/LoginBackground.png";

import "../Login/login.css";
import { requestSessionID } from '../../api/sessionRequest';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
 
  // API Calls
  const sendLoginRequest = async () => {
    const newLoginRequest: LoginRequest = {
      email: email,
      password: password
    };

    return await checkLoginRequest(newLoginRequest);
  };

  // Event Handlers
  const handleLogin = () => {
    const hasEmptyEmail = email.trim() === '';
    const hasEmptyPassword = password.trim() === '';
  
    const errorMessage =
    hasEmptyEmail && hasEmptyPassword
        ? 'Please enter email and password'
        : hasEmptyEmail
        ? 'Please enter email'
        : hasEmptyPassword
        ? 'Please enter password'
        : '';
        
    setError(errorMessage);
    setShowErrorMessage(errorMessage !== '');
  
    if (!errorMessage) {
      sendLoginRequest().then((result) => {
        if(result !== undefined) {
          requestSessionID();
        }
        else {
          const loginError = "Wrong email or password";
          setError(loginError);
          setShowErrorMessage(true);
        }
      });
    }
  };

  // Effects
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (showErrorMessage) {
      timer = setTimeout(() => {
        setError('');
        setShowErrorMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showErrorMessage]);

  // Login Page rendered
  return (
    <Box className="login-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className="login-paper" elevation={20} sx={{ borderRadius: 5 }}>
        <div className="login-wrapper">
          <h3 className="login-header">Welcome</h3>
          <TextField
            className="login-textfield"
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div>
            <TextField
              className="login-textfield"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <p>Forgot password?</p>
          </div>

          <div className="login-button-wrapper">
            <Button className="login-button" variant="outlined" color="primary">
              Sign Up
            </Button>

            <Button className="login-button" variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
          {showErrorMessage && <Alert variant="filled" severity="error">{error}</Alert>}
        </div>
      </Paper>
    </Box>
  );
};