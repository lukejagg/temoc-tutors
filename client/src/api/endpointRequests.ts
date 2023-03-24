import { 
  LoginRequest, 
} from "./dbEndpointTypes";

// Login Requests
export const checkLoginRequest = (loginRequest: LoginRequest) => {    
  const createRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginRequest),
  };
  
  fetch("http://localhost:8000/login", createRequestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Logged In", data);
  })
  .catch((err) => {
    console.error(err);
  });
};