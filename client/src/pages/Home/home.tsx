import  { useNavigate } from 'react-router-dom';
import "../Home/home.css";
import * as React from 'react';
import { Box, Paper} from '@mui/material';
import { Navbar } from "../../components/navbar/navbar";

export const Home: React.FC = () => {
    const navigate = useNavigate();
    // const handleClickLogin = () => navigate('/login');
    // const handleClickSignUp = () => navigate('/signup');
    return(
        <div>
            <Navbar/>
            
        </div>
    );
};
