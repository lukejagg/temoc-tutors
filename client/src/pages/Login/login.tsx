import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Alert } from '@mui/material';
import { LoginRequest, UserIdRequest } from '../../api/dbEndpointTypes';
import { checkLoginRequest, checkUserIdRequest } from '../../api/endpointRequests';
import { requestSessionID } from '../../api/sessionRequest';
import backgroundImage from "../../img/background.png";
import "../Login/login.css";

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  // API Calls
  const sendLoginRequest = async () => {
    const newLoginRequest: LoginRequest = {
      email: email,
      password: password
    };

    return await checkLoginRequest(newLoginRequest);
  };

  const sendUserIdRequest = async () => {
    const newUserIdRequest: UserIdRequest = {
      email: email
    };

    return await checkUserIdRequest(newUserIdRequest);
  };

  // Event Handlers
  const handleLogin = () => {
    const hasEmptyEmail = email.trim() === '';
    const hasEmptyPassword = password.trim() === '';
  
    const errorMessage = hasEmptyEmail && hasEmptyPassword
      ? 'Please enter email and password'
      : hasEmptyEmail
      ? 'Please enter email'
      : hasEmptyPassword
      ? 'Please enter password'
      : !isValidEmail(email)
      ? 'Email is not valid'
      : '';
        
    setError(errorMessage);
    setShowErrorMessage(errorMessage !== '');
  
    if (!errorMessage) {
      sendLoginRequest().then((result) => {
        if(result !== undefined) {
          requestSessionID().then(() => {
            sendUserIdRequest().then(() => {
              navigate('/');
            });
          });
        }
        else {
          const loginError = "Wrong email or password";
          setError(loginError);
          setShowErrorMessage(true);
        }
      });
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  // Other Functions
  const isValidEmail = (email : string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <Box className="login-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className="login-paper" elevation={20} sx={{ borderRadius: 5 }}>
        <div className="login-wrapper">
          <h3 className="login-header">Login</h3>
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
            <Button className="login-button" variant="outlined" color="primary" onClick={handleSignUp}>
              Sign Up
            </Button>

            <Button className="login-button" variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
          {showErrorMessage && (<Alert variant="filled" severity="error">{error}</Alert>)}
        </div>
      </Paper>
    </Box>
  );
};