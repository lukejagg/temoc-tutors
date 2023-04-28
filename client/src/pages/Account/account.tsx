import React from 'react';
import { Box, Button, Paper, TextField, Avatar, IconButton} from '@mui/material';
import "./account.css";
import backgroundImage from "../../img/background.png";
import { Navbar } from "../../components/navbar/navbar";

export const Account: React.FC = () => {

    return(
        <div> 
            <Navbar/>
            <Box className="account-background">
                    <div className="account-wrapper" > 
                        <h3 className="account-header"> Tutor Settings </h3>
                        <h4 className= "account-settings"> <b> Profile Picture</b></h4>
                        <IconButton> <Avatar sx={{width: 100, height: 100}}> H </Avatar> </IconButton>
                        <h4 className= "account-settings"> <b> Username & Subjects</b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                                label='Username'
                            /> 
                            <TextField
                                className="account-textfield"
                                value= {'Need to make this a dropdown'}
                                contentEditable = {false}
                                sx={{input: {color: 'red'}}}
                            /> 
                        </div>
                        <h4 className= "account-settings"> <b> Email </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                                label= 'Email'
                                
                            /> 
                        </div>
                        <h4 className= "account-settings"> <b> Password </b></h4>
                        <div className="account-sections">

                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                                label= 'Password'
                            /> 
                        </div>
                        <h4 className= "account-settings"> <b> Re-type Password </b></h4>
                        <div className="account-sections">

                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                                label= 'Re-type Password'
                            /> 
                        </div>
                        <div className="account-sections">
                            <Button className='account-button' variant="contained" color='primary'> Edit Profile </Button>
                        </div>
                    </div>
            </Box>
        </div>
    );
};