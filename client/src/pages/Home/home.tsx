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
            <Box className="home-background">
                <Paper className='home-paper' elevation={20} sx={{ borderRadius: 5 }} style={{background: 'black'}}>
                    <div className='home-paper-wrapper'>
                        <h3> Welcome to TemocTutors </h3>
                    </div>
                </Paper>
            </Box>
        </div>
    );
};
