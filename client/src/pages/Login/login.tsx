import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Grid } from '@mui/material';
import "../Login/login.css";
import backgroundImage from "../img/BackgroundImage.png";

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password');
    } else {
      // handle login logic here
      console.log(`Logged in with username: ${username} and password: ${password}`);
    }
  };

  return (
    <div>
      <Box className="loginBackground" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Paper className="loginPaper" elevation={20} sx={{ borderRadius: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1 className="loginHeader">Welcome</h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="loginTextfield"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="loginTextfield"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <a href="#">Forgot Passowrd?</a>
            </Grid>
            {error && <p>{error}</p>}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};