import { useState } from "react";
import { Student, StudentCreationRequest } from "../database/types";

export const createStudent = (student: StudentCreationRequest) => {    
    const createRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    };
    
    fetch("http://localhost:8000/students/create", createRequestOptions)
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
};