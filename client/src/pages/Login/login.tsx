import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Alert } from '@mui/material';
import "../Login/login.css";
import backgroundImage from "./img/LoginBackground.png";

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password');
      setShowErrorMessage(true);
    } else {
      // handle login logic here
      console.log(`Logged in with username: ${username} and password: ${password}`);
    }
  };

  return (
    <Box className="login-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className="login-paper" elevation={20} sx={{ borderRadius: 5 }}>
        <div className="login-wrapper">
          <h3 className="login-header">Welcome</h3>
          <TextField
            className="login-textfield"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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