import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Alert } from '@mui/material';
import { StudentCreationRequest, UserIdRequest } from '../../api/dbEndpointTypes';
import { useNavigate } from 'react-router-dom';
import { checkStudentCreationRequest, checkUserIdRequest } from '../../api/endpointRequests';
import { requestSessionID } from '../../api/sessionRequest';
import backgroundImage from "../../img/background.png";
import "./signup.css";

export const TutorSignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [subjects, setSubjects] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  // API Calls
  const sendStudentCreationRequest = async () => {
    const newSignUpRequest: StudentCreationRequest = {
      username: username,
      email: email,
      password: password
    };

    return await checkStudentCreationRequest(newSignUpRequest);
  };

  const sendUserIdRequest = async () => {
    const newUserIdRequest: UserIdRequest = {
      email: email
    };

    return await checkUserIdRequest(newUserIdRequest);
  };


  // Event Handlers
  const handleSignUp = async () => {
    const hasemptyUsername = username.trim() === '';
    const hasEmptyEmail = email.trim() === '';
    const hasEmptyPassword = password.trim() === '';
    const hasEmptyRetypePassword = retypePassword.trim() === '';

    const errorMessage = ( 
        (hasemptyUsername && hasEmptyEmail && hasEmptyPassword && hasEmptyRetypePassword) || 
        (hasemptyUsername && hasEmptyEmail && hasEmptyPassword) || 
        (hasemptyUsername && hasEmptyEmail) ||
        (hasEmptyRetypePassword) 
      )
      ? 'Please enter all the necessary fields'
      : hasemptyUsername
      ? 'Please enter a username'
      : hasEmptyEmail
      ? 'Please enter an email'
      : hasEmptyPassword
      ? 'Please enter a password'
      : (hasEmptyRetypePassword && !hasEmptyPassword)
      ? 'Please re-type your password'
      : (password !== retypePassword)
      ? 'Password does not match'
      : !isValidEmail(email)
      ? 'Email is not valid'
      : '';

      setError(errorMessage);
      setShowErrorMessage(errorMessage !== '');

      if(!errorMessage) {
        sendStudentCreationRequest().then((result) => {
          if(result !== undefined) {
            requestSessionID().then(() => {
              sendUserIdRequest().then(() => {
                navigate('/');
              });
            });
          }
          else {
            const signupError = "Account with this email already exists";
            setError(signupError);
            setShowErrorMessage(true);
          }
        });;
      }
  }

  const handleLogin = () => {
      navigate('/login');
  };

  // Other Functions
  const isValidEmail = (email : string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <Box className="signup-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className="signup-paper" elevation={20} sx={{ borderRadius: 5 }}>
        <div className="signup-wrapper">
          <h3 className="signup-header">Sign Up</h3>

          <TextField
            className="signup-textfield"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
              onPaste={(event) => event.preventDefault()}
            />
          </div>

          <div className="signup-button-wrapper">
            <Button className="signup-button" variant="outlined" color="primary" onClick={handleLogin}>
              Login
            </Button>

            <Button className="signup-button" variant="contained" color="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
          {showErrorMessage && (<Alert variant="filled" severity="error">{error}</Alert>)}
        </div>
      </Paper>
    </Box>
  );
};