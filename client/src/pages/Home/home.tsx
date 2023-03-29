import  { useNavigate } from 'react-router-dom';
import "../Home/home.css";
import backgroundImage from "../../img/background.png";
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
            <Box className="home-background" style={{ backgroundImage: `url(${backgroundImage})`}}>
                <Paper className='home-paper' elevation={20} sx={{ borderRadius: 5 }} style={{background: 'black'}}>
                    <div className='home-paper-wrapper' 
                        style={{fontSize: 'xx-large', color: 'white'}}>
                        <h3> Welcome to TemocTutors </h3>
                        <p> TemocTutors </p>
                    </div>
                </Paper>
            </Box>
        </div>
    );
};
