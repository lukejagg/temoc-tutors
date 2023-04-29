import { useEffect, useState } from 'react';
import { StudentAccount } from './student-account';
import { TutorAccount } from './tutor-account';
import * as React from 'react';

enum UserType {
  STUDENT = 's',
  TUTOR = 't',
}

interface AccountProps {
  userType?: UserType;
}

export const Account: React.FC<AccountProps> = ({ userType: userTypeProp }) => {
  const [userType, setUserType] = useState<UserType | undefined>(userTypeProp);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType as UserType);
    }
  }, []);

    if(userType === 's') {
      return (
        <>
          <StudentAccount />
        </>
      );
    }
    else if(userType === 't') {
      return <TutorAccount />;
    }
    else {
      return (
        <h1>An unexpected error has occured</h1>
      )
    }
};
