import * as React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Navbar } from "../../components/navbar/navbar";

export const TutorHome: React.FC = () => {
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <img src="/path/to/horizontal-image.jpg" alt="Horizontal" style={{ width: '100%', height: 'auto' }} />
      <Container maxWidth="sm" style={{ margin: '32px auto', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Company Name
        </Typography>
        <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, odio non rhoncus facilisis, dui sapien maximus purus, in faucibus ipsum nunc auctor mauris. Integer eget neque et quam tincidunt hendrerit vel nec magna.
        </Typography>
      </Container>
      <Button variant="contained" color="primary" size="large" style={{ margin: '32px auto' }}>
      Click Here
      </Button>
    </div>
  );
};