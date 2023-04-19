import React from 'react';
import { Box } from '@mui/material';
import "./account.css";
import backgroundImage from "../../img/background.png";
import { Navbar } from "../../components/navbar/navbar";

export const Account: React.FC = () => {

    return(
        <div> 
            <Navbar/>
            <Box className="account-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h3 style={{color: 'red', fontSize: '50px' }}> Add a table here that lays out the settings </h3>
            </Box>
        </div>
    );
};