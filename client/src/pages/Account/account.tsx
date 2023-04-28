import React from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import "./account.css";
import backgroundImage from "../../img/background.png";
import { Navbar } from "../../components/navbar/navbar";

export const Account: React.FC = () => {

    return(
        <div> 
            <Navbar/>
            <Box className="account-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <Paper className="account-paper" elevation={20} sx={{ borderRadius: 5 }}>
                    <div className="account-wrapper" > 
                        <h3 className="account-header"> Tutor Settings </h3>
                        <h4 className= "account-settings"> <b> Username</b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                            /> 
                            <Button className='account-button' variant="contained" color='secondary'> Edit Username </Button>
                        </div>
                        <h4 className= "account-settings"> <b> Email </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                                
                            /> 
                            <Button className='account-button' variant="contained" color='secondary'> Edit Email </Button>
                        </div>
                        <h4 className= "account-settings"> <b> Subjects</b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'Need to make this a dropdown'}
                                contentEditable = {false}
                                sx={{input: {color: 'red'}}}
                            /> 
                            <Button className='account-button' variant="contained" color='secondary'> Edit Subjects </Button>
                        </div>
                        <h4 className= "account-settings"> <b> Password </b></h4>
                        <div className="account-sections">
                            <TextField
                                className="account-textfield"
                                value= {'hello whats up'}
                                contentEditable = {false}
                            /> 
                            <Button className='account-button' variant="contained" color='secondary'> Edit Password </Button>
                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    );
};