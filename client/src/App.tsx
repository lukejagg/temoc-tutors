import { useState, ChangeEvent, FormEvent } from "react";

import { Student, StudentCreationRequest } from "./database/types";

import "./App.css";

// Create a request to test the backend-database endpoint

const newStudent: StudentCreationRequest = {
  username: "johndoe",
  email: "johndoe@example.com",
  password: "mypassword",
};

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newStudent),
};

fetch("http://localhost:8000/students/create", requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Student created:", data);
  })
  .catch((err) => {
    console.error("Error creating tutor:", err);
  });

const App: React.FC = () => {
  const [tutors, setTutors] = useState<Student[]>([]);

  const handleCreateTutor = (tutor: Student) => {
    setTutors((prevTutors) => [...prevTutors, tutor]);
  };

  return (
    <div>
      <h1>this react component doesn't do anything</h1>
      <h2>Check console for db output</h2>
    </div>
  );
};

export default App;
