import { LoginRequest, StudentCreationRequest, StudentAppointmentsCheckRequest, UserIdRequest, TutorLoginRequest, TutorAppointmentsCheckRequest } from "./dbEndpointTypes";

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

    console.log(localStorage.getItem("userId"))

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