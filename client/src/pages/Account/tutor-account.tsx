import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, OutlinedInput} from '@mui/material';
import "./tutor-account.css";
import { Navbar } from "../../components/navbar/navbar";
import { checkGetSubjects, checkTutorProfileRequest } from '../../api/endpointRequests';
import { TutorProfileRequest } from '../../api/dbEndpointTypes';

export const TutorAccount: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null)
    const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [retypePassword, setRetypePassword] = useState<string | null>(null);
    
    //API calls 
    const getSubjects = async () => {
        const response = await checkGetSubjects();
        const subjects = response.map ((item:any) => item.subject_type)
        return subjects;
    };

    const getTutorProfile = async () => {
        const newTutorProfileRequest: TutorProfileRequest = {
            tutor_id: localStorage.getItem('userId')
        };

        return await checkTutorProfileRequest(newTutorProfileRequest);
    };

    useEffect(() => {
        getSubjects()
        .then(response => {
            return response;
        })
        .then(data => setSubjects(data))
    }, []);

    useEffect(() => {
        getTutorProfile()
        .then(response => {
            return response;
        })
    }, []);

    return(
        <div> 
            <Navbar/>
            <Box className="account-background">
                    <div className="account-wrapper" > 
                        <h3 className="account-header"> Tutor Settings </h3>
                        <h4 className= "account-settings"> <b> Profile Picture</b></h4>
                        <IconButton> <Avatar sx={{width: 100, height: 100}}> {username} </Avatar> </IconButton>
                        <h4 className= "account-settings"> <b> Username & Subjects</b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-settings"
                                value= {username}
                                label='Username'
                                onChange={(event) => setUsername(event.target.value)}
                            /> 
                            <FormControl>
                                <InputLabel>Subject</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedSubject}
                                        label="Subject"
                                        multiple
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        sx={{ width: '200px', background: 'white' }}
                                        onChange={(event) => setSelectedSubject(event.target.value as string[])}
                                        >
                                        {subjects.map(subject => (
                                        <MenuItem key={subject} value={subject}>
                                            {subject}
                                        </MenuItem>
                                        ))}
                                    </Select>
                            </FormControl>
                        </div>
                        <h4 className= "account-settings"> <b> Email </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {email}
                                label= 'Email'
                                onChange={(event) => setEmail(event.target.value)}
                            /> 
                        </div>
                        <h4 className= "account-settings"> <b> Password </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {password}
                                label= 'Password'
                                onChange={(event) => setPassword(event.target.value)}
                            /> 
                        </div>
                        <h4 className= "account-settings"> <b> Re-type Password </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {retypePassword}
                                label= 'Re-type Password'
                                onChange={(event) => setRetypePassword(event.target.value)}
                            /> 
                        </div>
                        <div className="account-sections">
                            <Button className='update-button' variant="contained" color='primary'> Update Profile </Button>
                        </div>
                    </div>
            </Box>
        </div>
    );
};