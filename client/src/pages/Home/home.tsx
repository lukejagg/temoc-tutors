import { useEffect, useState } from 'react';
import { StudentHome } from './student-home';
import { GuestHome } from './guest-home';
import { TutorHome } from './tutor-home';
import * as React from 'react';

enum UserType {
  STUDENT = 's',
  TUTOR = 't',
}

interface HomeProps {
  sessionId?: string;
  userType?: UserType;
}

export const Home: React.FC<HomeProps> = ({ sessionId: sessionIdProp, userType: userTypeProp }) => {
  const [sessionId, setSessionId] = useState<string | undefined>(sessionIdProp);
  const [userType, setUserType] = useState<UserType | undefined>(userTypeProp);

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

  if(sessionId) {
    if(userType === 's') {
      return <StudentHome />;
    }
    else if(userType === 't') {
      return <TutorHome />;
    }
    else {
      return (
        <h1>An unexpected error has occured</h1>
      )
    }
  }
  else {
    return <GuestHome />;
  }
};
