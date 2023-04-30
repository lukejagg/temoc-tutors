import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, Grid} from '@mui/material';
import "./student-account.css";
import { Navbar } from "../../components/navbar/navbar";
import { checkGetSubjects, checkProfileUpdateRequest } from '../../api/endpointRequests';
import { ProfileUpdateRequest } from '../../api/dbEndpointTypes';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const StudentAccount: React.FC = () => {
    const [username, setUsername] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [retypePassword, setRetypePassword] = useState<string | null>('');
    const [profilePic, setProfilePic] = useState<File | null | undefined>();
    const [id, ] = useState<string | null>(localStorage.getItem('userId'));
    
    // API Calls
    const sendProfileUpdateRequest = async () => {
        const newProfileUpdateRequest: ProfileUpdateRequest = {
            username: username,
            email: email,
            password: password,
            profile_pic: profilePic,
            id: id
    };

        return await checkProfileUpdateRequest(newProfileUpdateRequest);
    };

    const handleUpdateRequest = () => {
        if ((username !== null || username !== "") || (email !== null || email !== "") || (password !== null || password !== "") || (profilePic !== null || profilePic !== undefined)) {
            if (password === retypePassword) {
                sendProfileUpdateRequest();
            } else {
                // handle later (if password doesnt match retyped password)
            }
        }
    };

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        setProfilePic(selectedFiles?.[0]);
    };

    return(
        <div> 
            <Navbar/>
            <Box className="studentAcc-background">
                    <div className="studentAcc-wrapper" > 
                        <h3 className="studentAcc-header"> Student Settings </h3>
                        <h4 className= "studentAcc-settings"> <b> Profile Picture</b></h4>
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
                        <h4 className= "studentAcc-settings"> <b> Username</b></h4>
                        <div className="studentAcc-sections">
                            <TextField
                                className="studentAcc-settings"
                                value= {username}
                                label='Username'
                                onChange={(event) => setUsername(event.target.value)}
                            /> 
                        </div>
                        <h4 className= "studentAcc-settings"> <b> Email </b></h4>
                        <div className="studentAcc-sections">
                            <TextField
                                className="studentAcc-textfield"
                                value= {email}
                                label= 'Email'
                                onChange={(event) => setEmail(event.target.value)}
                            /> 
                        </div>
                        <h4 className= "studentAcc-settings"> <b> Password </b></h4>
                        <div className="studentAcc-sections">
                            <TextField
                                className="studentAcc-textfield"
                                value= {password}
                                label= 'Password'
                                onChange={(event) => setPassword(event.target.value)}
                            /> 
                        </div>
                        <h4 className= "studentAcc-settings"> <b> Re-type Password </b></h4>
                        <div className="studentAcc-sections">
                            <TextField
                                className="studentAcc-textfield"
                                value= {retypePassword}
                                label= 'Re-type Password'
                                onChange={(event) => setRetypePassword(event.target.value)}
                            /> 
                        </div>
                        <div className="studentAcc-sections">
                            <Button className='update-button' variant="contained" color='primary' onClick={handleUpdateRequest}> Update Profile </Button>
                        </div>
                    </div>
            </Box>
        </div>
    );
};