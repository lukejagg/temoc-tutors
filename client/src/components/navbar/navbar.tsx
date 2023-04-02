import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  sessionId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ sessionId: sessionIdProp }) => {
  const [sessionId, setSessionId] = useState<string | undefined>(sessionIdProp);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionID');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  // Button Handlers

  const handleLogOut = () => {
    localStorage.removeItem('sessionID');
    window.location.reload();
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: '#333' }}>
        <Toolbar>
          <Box sx={{ marginLeft: '16px' }}>
            <img src={require('../../img/icon.png')} alt="TemocTutor" width={50} height={50} />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TemocTutors
          </Typography>

          {
            /* First part is if user is logged in and authenticated.
            Second half is if the user is not logged in */
          }
          {sessionId ? ( 
            <Box sx={{ paddingLeft: '16px' }}>
              <Button sx={{ marginRight: '10px' }} variant='contained' color="error" onClick={handleLogOut}>Log Out</Button>
            </Box>
          ) : (
            <Box sx={{ paddingLeft: '16px' }}>
              <Link to="/login"><Button sx={{ marginRight: '10px' }} variant='outlined' color="inherit">Log In</Button></Link>
              <Link to="/signup"><Button sx={{ marginRight: '10px' }} variant='contained' color="inherit">Sign Up</Button></Link>
            </Box>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
};
