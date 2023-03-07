import React, { useState } from 'react';
import { Container, TextField, Grid, Button  } from '@mui/material';
import styles from "./login.module.css"

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
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};