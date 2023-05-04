import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/navbar';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { checkAllFavoriteTutors, updateTutor } from '../../api/endpointRequests';

export const Favorites: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [studentFavorite, setStudentFavorite] = React.useState<any[] | undefined>();

  const goldColor = "#FFD700";

  const allFavoriteTutors = async () => {
    let idNum = localStorage.getItem('userId');
    
    if (idNum !== null) {
      checkAllFavoriteTutors(idNum).then((response) => {
        setStudentFavorite(response);
      });
    }
  }
  
  const handleEdit = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleFavorite = async (chosenTutor: any) => {
    const newTutor = { ...chosenTutor };
    newTutor.favorite_id = newTutor.favorite_id ? null : 1;
    
    const newTutors = studentFavorite?.map((t) => (t.id === chosenTutor.id ? newTutor : t));
    setStudentFavorite(newTutors);
    
    await updateTutor(newTutor);
  };
  
  useEffect(() => {
    allFavoriteTutors();
  }, []);

  return (
    <div>
      <div className="top-content">
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1>Favorite Tutors</h1>
        </Box>

        <Paper sx={{ padding: "5px", maxHeight: "650px", overflowY: "auto", width: "700px", margin: "50px auto 0" }}>
          {studentFavorite && studentFavorite.length > 0 ? (
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {studentFavorite.map((favorite) => (
              <ListItem key={favorite.id} sx={{ height: "125px", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ height: "85px", width: "85px", margin: "20px" }}
                    src={favorite.profile_picture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={favorite.username}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
                <ListItemText
                  primary={"Subjects:"}
                  secondary={favorite.subjects.replace(/[{}]/g, "")}
                  sx={{ width: '100%', textAlign: 'left' }}
                />
                {favorite.about_me ? (
                  <>
                    <Tooltip title="View About Me" aria-label="edit">
                      <IconButton aria-label="edit" onClick={handleEdit}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>About Me</DialogTitle>
                      <DialogContent>
                        {favorite.about_me}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : (
                  <></>
                )}
                <IconButton aria-label="make-appointment" onClick={() => handleFavorite(favorite)}>
                {favorite.favorite_id ? (
                  <StarIcon sx={{ color: goldColor }} />
                ) : (
                  <StarBorderIcon sx={{ color: goldColor }} />
                )}
              </IconButton>
              </ListItem>
            ))}
          </List>
          ) : (
            <>
              <p>No appointments scheduled</p>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
};