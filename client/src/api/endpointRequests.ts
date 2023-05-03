import { LoginRequest, StudentCreationRequest, StudentAppointmentsCheckRequest, UserIdRequest, TutorLoginRequest, TutorAppointmentsCheckRequest, AppointmentRequest, AppointmentValidityCheck, TutorScheduleAppointment, AppointmentReservation, TutorCreationRequest, TutorAll, TutorFav } from "./dbEndpointTypes";

const API_BASE_URL = "http://localhost:8000";

export const checkLoginRequest = async (loginRequest: LoginRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginRequest),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    localStorage.setItem('userType', 's');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorLoginRequest = async (tutorLoginRequest: TutorLoginRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorLoginRequest),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/tutorlogin`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    localStorage.setItem('userType', 't');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkUserIdRequest = async (userIdRequest: UserIdRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userIdRequest),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/login/userid`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const responseData = await response.json();
    const userId = await responseData.id;

    localStorage.setItem('userId', userId);

    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorUserIdRequest = async (userIdRequest: UserIdRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userIdRequest),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/login/tutor/userid`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const responseData = await response.json();
    const userId = await responseData.id;

    localStorage.setItem('userId', userId);

    console.log(localStorage.getItem("userId"))

    return responseData;
  } catch (error) {
    console.error(error);
  }
};


export const checkStudentCreationRequest = async (studentCreationRequest: StudentCreationRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentCreationRequest),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    localStorage.setItem('userType', 's');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkStudentAppointmentsCheckRequest = async (studentAppointmentsCheckRequest: StudentAppointmentsCheckRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentAppointmentsCheckRequest),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/appointment/date`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorAppointmentsCheckRequest = async (tutorAppointmentsCheckRequest: TutorAppointmentsCheckRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorAppointmentsCheckRequest),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/appointment/tutor/date`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkGetSubjects = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "",
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/subjects`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkAppointmentRequest = async (appointmentRequest: AppointmentRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentRequest),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/appointment/student/request`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkAppointmentValidityCheck = async (appointmentValidityCheck: AppointmentValidityCheck) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentValidityCheck),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/appointment/confirmation`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkNewTutorSchedule = async (tutorScheduleAppointment: TutorScheduleAppointment) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorScheduleAppointment),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/schedule/appointment`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteTutorScheduleAppointment = async (tutorScheduleAppointment: TutorScheduleAppointment) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorScheduleAppointment),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/schedule/delete`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorScheduleExists = async (tutorScheduleAppointment: TutorScheduleAppointment) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorScheduleAppointment),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/schedule/check`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkAppointmentReservation = async (appointmentReservation: AppointmentReservation) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentReservation),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/user/new/appointment`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorCreationRequest = async (tutorCreation: TutorCreationRequest) => {
  const formData = new FormData();
  formData.append('email', tutorCreation.email);
  formData.append('username', tutorCreation.username);
  formData.append('password', tutorCreation.password);
  if (tutorCreation.profile_picture) {
    formData.append('profile_picture', tutorCreation.profile_picture);
  }
  formData.append('subject', JSON.stringify(tutorCreation.subject));
  if (tutorCreation.about_me) {
    formData.append('about_me', tutorCreation.about_me);
  }

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/user/new/tutor`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    localStorage.setItem('userType', 't');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkAllTutors = async (tutorAll: TutorAll) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutorAll),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/alltutors`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateTutor = async (tutor: any) => {
  let id = localStorage.getItem('userId')

  if (id !== null) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tutor_id: tutor.id, favorite_id: tutor.favorite_id, student_id: parseInt(id)}),
    };
    
    if (tutor.favorite_id) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/favorites`, requestOptions);
    
        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
    
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    } else {
      // Send an API request to remove the row from the favorite table
      try {
        const response = await fetch(`${API_BASE_URL}/delete/favorites`, requestOptions);
    
        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`);
        }
    
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }
};


/*
const tutorId = 1; // Replace with the actual tutor ID
const avatarUrl = getTutorAvatarUrl(tutorId);

<img src={avatarUrl} alt="Tutor's avatar" />
*/
export const getTutorAvatarUrl = (tutorId: number | string) => {
  return `${API_BASE_URL}/user/tutor/${tutorId}/profile_picture`;
};