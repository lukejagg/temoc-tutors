import React, { useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import "./profile.css";
import backgroundImage from "../../img/background.png";
import { Navbar } from "../../components/navbar/navbar";

export const Dashboard: React.FC = () => {

    const navigate = useNavigate();
    return(
        <div> 
            <Navbar/>
            <Box className="dashboard-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h3> Hello [Name] - Add a calendar</h3>
            </Box>
        </div>
    );
};
