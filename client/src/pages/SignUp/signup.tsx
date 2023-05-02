import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Alert, Typography, Grid, Avatar, IconButton } from '@mui/material';
import { StudentCreationRequest, UserIdRequest } from '../../api/dbEndpointTypes';
import { useNavigate } from 'react-router-dom';
import { checkStudentCreationRequest, checkUserIdRequest } from '../../api/endpointRequests';
import { requestSessionID } from '../../api/sessionRequest';
import backgroundImage from "../../img/background.png";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import "./signup.css";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null | undefined>();
  const navigate = useNavigate();

  // API Calls
  const sendStudentCreationRequest = async () => {
    const newSignUpRequest: StudentCreationRequest = {
      username: username,
      email: email,
      password: password,
      profile_pic: profilePic
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
      : (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)))
      ? 'Password not strong enough, make sure to include 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be 8 characters long at least'
      : (password !== retypePassword)
      ? 'Password does not match'
      : !isValidEmail(email)
      ? 'Email is not valid'
      : '';

      setError(errorMessage);
      setShowErrorMessage(errorMessage !== '');

      console.log(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));

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

  const handleTutorRedirect = () => {
    navigate('/tutorsignup');
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setProfilePic(selectedFiles?.[0]);
  };

  return (
    <Box className="signup-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Paper className="signup-paper" elevation={20} sx={{ borderRadius: 5, height: "auto" }}>
        <div className="signup-wrapper">
          <h3 className="signup-header">Student Sign Up</h3>

          <div>
            <Typography>Select a Profile Picture</Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Typography variant="subtitle1">
                  {profilePic ? (
                    <Avatar
                      src={URL.createObjectURL(profilePic)}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <Avatar style={{ width: "100px", height: "100px" }} />
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={selectImage}
                />
                <label htmlFor="fileInput">
                  <IconButton component="span">
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </label>
              </Grid>
            </Grid>
          </div>

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

            <Button className="signup-button" variant="outlined" color="primary" onClick={handleTutorRedirect}>
              Tutor Sign Up
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