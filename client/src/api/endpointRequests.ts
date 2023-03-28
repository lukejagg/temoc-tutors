import { 
  LoginRequest, 
} from "./dbEndpointTypes";

export const checkLoginRequest = async (loginRequest: LoginRequest) => {    
  const createRequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginRequest),
  };
  
  try {
    const response = await fetch("http://localhost:8000/login", createRequestOptions);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    console.log("Logged In");
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};