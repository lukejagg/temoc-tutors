import { LoginRequest, StudentCreationRequest } from "./dbEndpointTypes";

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

    return await response.json();
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

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};