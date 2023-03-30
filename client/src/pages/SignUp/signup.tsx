import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Alert } from '@mui/material';
import backgroundImage from "../../img/background.png";

import "./signup.css";
import { requestSessionID } from '../../api/sessionRequest';

export const SignUp: React.FC = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [schoolname, setSchool] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    const handleLogin = () => {
        const hasEmptyEmail = email.trim() === '';
        const hasEmptyPassword = password.trim() === '';
      
        const errorMessage = hasEmptyEmail && hasEmptyPassword
          ? 'Please enter email and password'
          : hasEmptyEmail
          ? 'Please enter email'
          : hasEmptyPassword
          ? 'Please enter password'
          : '';
            
        setError(errorMessage);
        setShowErrorMessage(errorMessage !== '');
      
        if (!errorMessage) {
          const loginError = "Wrong email or password";
          setError(loginError);
          setShowErrorMessage(true);
        }
      };

    return (
        <Box className="signup-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Paper className="signup-paper" elevation={20} sx={{ borderRadius: 5 }}>
            <div className="signup-wrapper">
            <h3 className="signup-header">Sign Up</h3>
            <TextField
                className="signup-textfield"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
                className="signup-textfield"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
            <TextField
                className="signup-textfield"
                label="School Name"
                value={schoolname}
                onChange={(event) => setSchool(event.target.value)}
            />
            <TextField
                className="signup-textfield"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
                className="signup-textfield"
                label="Password"
                type ="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <div>
                <TextField
                className="signup-textfield"
                label="Re-type Password"
                type="password"
                value={retypePassword}
                onChange={(event) => setRetypePassword(event.target.value)}
                />
            </div>

            <div className="signup-button-wrapper">
                <Button className="signup-button" variant="outlined" color="primary">
                Login
                </Button>

                <Button className="signup-button" variant="contained" color="primary" onClick={handleLogin}>
                Sign Up
                </Button>
            </div>
            {showErrorMessage && (<Alert variant="filled" severity="error">{error}</Alert>)}
            </div>
        </Paper>
        </Box>
  );
};