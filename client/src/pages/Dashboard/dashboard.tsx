import React from 'react';
import { Box } from '@mui/material';
import "./dashboard.css";
import backgroundImage from "../../img/background.png";
import { Navbar } from "../../components/navbar/navbar";

export const Dashboard: React.FC = () => {
    return(
        <div> 
            <Navbar/>
            <Box className="dashboard-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h3 style={{color: 'red', fontSize: '50px'}}> Hello [Name] - Add a calendar</h3>
            </Box>
        </div>
    );
};
