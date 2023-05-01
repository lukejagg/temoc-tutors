import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

enum UserType {
  STUDENT = 's',
  TUTOR = 't',
}

interface NavbarProps {
  sessionId?: string;
  userType?: UserType;
}

export const Navbar: React.FC<NavbarProps> = ({ sessionId: sessionIdProp, userType: userTypeProp }) => {
  const [sessionId, setSessionId] = useState<string | undefined>(sessionIdProp);
  const [userType, setUserType] = useState<UserType | undefined>(userTypeProp);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionID');
    const storedUserType = localStorage.getItem('userType');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
    if (storedUserType) {
      setUserType(storedUserType as UserType);
    }
  }, []);

  // Button Handlers

  const handleLogOut = () => {
    localStorage.clear();
    handleHomeRedirect();

    window.location.reload();
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const handleTutorSearchRedirect = () => {
    navigate('/tutorsearch');
  }

  const handleProfileRedirect = () => {
    navigate('/account');
  };

  // Event Handlers
  const renderUserTypeButtons = () => {
    if (userType === UserType.STUDENT) {
      return (
        <>
          <Button color="primary" sx={{ marginRight: '10px' }} onClick={handleHomeRedirect}>Home</Button>
          <Button color="primary" sx={{ marginRight: '10px' }} onClick={handleTutorSearchRedirect}>Tutor Search</Button>
          <Button color="primary" sx={{ marginRight: '10px' }} onClick={handleProfileRedirect}>Profile</Button>
        </>
      );
    } else if (userType === UserType.TUTOR) {
      return (
        <>
          <Button color="primary" sx={{ marginRight: '10px' }} onClick={handleHomeRedirect}>Home</Button>
          <Button color="primary" sx={{ marginRight: '10px' }} onClick={handleProfileRedirect}>Profile</Button>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Box>
      <AppBar position="fixed" elevation={1} sx={{ backgroundColor: '#fff', color: '#333'}}>
        <Toolbar>
          <Box sx={{ marginLeft: '16px' }}>
            <img src={require('../../img/icon.png')} alt="TemocTutor" width={50} height={50} />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TemocTutors
          </Typography>

          {sessionId ? ( 
            <Box sx={{ paddingLeft: '16px' }}>
              {renderUserTypeButtons()}
              <Button sx={{ marginRight: '10px' }} variant='contained' color="error" onClick={handleLogOut}>Log Out</Button>
            </Box>
          ) : (
            <Box sx={{ paddingLeft: '16px' }}>
              <Link to="/login"><Button sx={{ marginRight: '10px' }} variant='outlined' color="primary">Log In</Button></Link>
              <Link to="/signup"><Button sx={{ marginRight: '10px' }} variant='contained' color="primary">Sign Up</Button></Link>
            </Box>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
};
