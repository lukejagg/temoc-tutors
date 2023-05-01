import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { AppointmentValidityCheck, TutorAll } from '../../../api/dbEndpointTypes';
import { checkAllTutors, checkAppointmentValidityCheck } from '../../../api/endpointRequests';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { blue } from '@mui/material/colors';

export const AllTutors: React.FC = () => {
  const [tutor, setTutor] = useState<any[] | null | undefined>();
  const [loading, setLoading] = useState(true);
  const [filled, setFilled] = useState(false);

  const goldColor = "#FFD700";

  const getAllTutors = async () => {
    const newTutorAll: TutorAll = {
      id: localStorage.getItem('userId')
    }

    await checkAllTutors(newTutorAll).then((result) => {
      setTutor(result);
      setLoading(false);
    });
  }

  const handleFavorite = async (chosenTutor: any) => {
    setFilled(!filled);
  }

  const loadFavorites = async (chosenTutor: any) => {
    console.log(chosenTutor)
  }

  useEffect(() => {
    getAllTutors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {tutor ? (
        <div>
          {tutor.map((tut) => (
            <ListItem key={tut.id} sx={{ height: "125px", alignSelf: "flex-start" }}>              
              <ListItemAvatar>
                <Avatar
                  sx={{ height: "85px", width: "85px", margin: "20px" }}
                  src={URL.createObjectURL(tut.profile_picture)}
                />
              </ListItemAvatar>

              <ListItemText
                sx={{ width: "200px" }}
                primary={tut.username}
              />

              <ListItemText
                sx={{ width: "300px", marginTop: "25px" }}
                primary={"Subjects: "}
                secondary={tut.subjects.replace(/[{}]/g, "")}
              />

              <IconButton aria-label="make-appointment" onClick={() => handleFavorite(tut.id)}>
                {tut.favorite_id ? (
                  <StarIcon sx={{ color: goldColor }} />
                ) : (
                  <StarBorderIcon sx={{ color: goldColor }} />
                )}
              </IconButton>
            </ListItem>
          ))}
        </div>
      ) : (
        <div>An error has occured</div>
      )}
    </List>
  );
};
