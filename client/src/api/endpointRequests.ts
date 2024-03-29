import { LoginRequest, StudentCreationRequest, StudentAppointmentsCheckRequest, UserIdRequest, TutorLoginRequest, TutorAppointmentsCheckRequest, AppointmentRequest, AppointmentValidityCheck, TutorScheduleAppointment, AppointmentReservation, TutorCreationRequest, TutorAll, TutorFav, IdForTutorProfilePicture, ConfirmationSubmissionSchedule } from "./dbEndpointTypes";

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

    const students = await response.json();

    for (const student of students) {
      const studentId = student.student_id;
      let profilePicture = await getStudentAvatarUrl(studentId);
      student.profile_picture = profilePicture;
    }

    return await students;
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

    const appointments = await response.json();
    for (const appointment of appointments) {
      const tutorId = appointment.tutor_id;
      const profilePicture = await getTutorAvatarUrl(tutorId);
      appointment.profile_picture = profilePicture;
    }

    console.log(appointments);
    return appointments;
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

    const tutors = await response.json();

    for (const tutor of tutors) {
      console.log(tutor)
      const tutorId = tutor.id;
      console.log(tutorId)
      let profilePicture = await getTutorAvatarUrl(tutorId);
      tutor.profile_picture = profilePicture;
      console.log(tutor)
    }

    return await tutors;
  } catch (error) {
    console.error(error);
  }
};

export const checkStudentTutoredHoursRequest = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/student/hours`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkTutorTutoredHoursRequest = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/hours`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

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
    
    const tutors = await response.json();

    for (const tutor of tutors) {
      const tutorId = tutor.tutor_id;
      let profilePicture = await getTutorAvatarUrl(tutorId);
      tutor.profile_picture = profilePicture;
    }

    return await tutors;
    
  } catch (error) {
    console.error(error);
  }
};

export const loadTutorInformation = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/load/tutor/information`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    
    const tutors = await response.json();
    
    let profilePicture = await getTutorAvatarUrl(id);
    tutors[0].profile_picture = profilePicture;

    return await tutors;
    
  } catch (error) {
    console.error(error);
  }
};

export const checkAllStudentAppointmentsCheckRequest = async (id: string, today: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id, today: today}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/all/student/appointments`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    
    const appointments = await response.json();

    for (const appointment of appointments) {
      const tutorId = appointment.tutor_id;
      let profilePicture = await getTutorAvatarUrl(tutorId);
      appointment.profile_picture = profilePicture;
    }
    
    return await appointments;
    
  } catch (error) {
    console.error(error);
  }
};

export const checkAllTutorAppointmentsCheckRequest = async (id: string, today: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id, today: today}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/all/tutor/appointments`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    
    const appointments = await response.json();

    for (const appointment of appointments) {
      const studentId = appointment.student_id;
      let profilePicture = await getStudentAvatarUrl(studentId);
      appointment.profile_picture = profilePicture;
    }
    
    return await appointments;
    
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

export const checkStudentCreationRequest = async (studentCreationRequest: StudentCreationRequest) => {
  const formData = new FormData();
  formData.append('email', studentCreationRequest.email);
  formData.append('username', studentCreationRequest.username);
  formData.append('password', studentCreationRequest.password);
  if (studentCreationRequest.profile_pic) {
    formData.append('profile_pic', studentCreationRequest.profile_pic);
  }

  const requestOptions = {
    method: 'POST',
    body: formData,
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


export const checkIdForTutorProfilePicture= async (idForTutorProfilePicture: IdForTutorProfilePicture) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idForTutorProfilePicture),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/retrieve/tutor/id`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const checkAllFavoriteTutors = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id}),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/student/all/favorite`, requestOptions);
    
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const favorites = await response.json();

    for (const favorite of favorites) {
      const tutorId = favorite.id;
      let profilePicture = await getTutorAvatarUrl(tutorId);
      favorite.profile_picture = profilePicture;
    }
    
    return await favorites;
  } catch (error) {
    console.error(error);
  }
};

export const getTutorAvatarUrl = async (tutorId: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/user/tutor/${tutorId}/profile_picture`, requestOptions);

    const imageURL = URL.createObjectURL(await response.blob());

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return imageURL;
  } catch (error) {
    console.error(error);
  }
};

export const getStudentAvatarUrl = async (studentId: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/user/student/${studentId}/profile_picture`, requestOptions);

    const imageURL = URL.createObjectURL(await response.blob());

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return imageURL;
  } catch (error) {
    console.error(error);
  }
};

export const checkConfirmationSend = async (newConfirmationSubmissionSchedule: ConfirmationSubmissionSchedule) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newConfirmationSubmissionSchedule),
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/confirm/send/schedule`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return true;
  } catch (error) {
    return false;
  }
}
