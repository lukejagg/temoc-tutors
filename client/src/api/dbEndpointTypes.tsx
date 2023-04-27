import { Dayjs } from "dayjs";

// Interface for user logging on
export interface LoginRequest {
    email: string;
    password: string;
}

// Interface for user logging on
export interface TutorLoginRequest {
    email: string;
    password: string;
}


// Interface for getting User ID
export interface UserIdRequest {
    email: string;
}

// Interface for getting the session ID
export interface SessionData {
    sessionId: string;
}

//Interface for signing up
export interface StudentCreationRequest {
    email: string;
    username: string;
    password: string;
}

export interface StudentAppointmentsCheckRequest {
    id: string | null;
    date: string;
}

export interface TutorAppointmentsCheckRequest {
    id: string | null;
    date: string;
}

export interface AppointmentRequest {
    username: string | null;
    date: string | null;
    start_time: string | null;
    end_time: string | null;
    subject: string | null;
}

export interface AppointmentValidityCheck {
    id: string | null;
    date: string | null;
    start_time: string | null;
    end_time: string | null;
}

// // Interfaces for tutor-related endpoints
// export interface Tutor {
//     id: number;
//     subjects: string[];
//     aboutMe: string;
//     availableHours: Uint8Array[];
//     profilePicture: Uint8Array | null;
// }


// // Interfaces for student-related endpoints
// export interface Student {
//     id: number;
//     username: string;
//     email: string;
//     password: string;
//     totalTutoringHours: number;
//     tutorId: number | null;
// }

// export interface Favorite {
//     id: number;
//     studentId: number;
//     tutorId: number;
// }

// // Interfaces for appointment-related endpoints
// export interface Appointment {
//     id: number;
//     date: string;
//     time: Uint8Array;
//     studentId: number;
//     tutorId: number;
// }

// export interface AppointmentRequest {
//     date: string;
//     time: Uint8Array;
//     studentId: number;
//     tutorId: number;
// }
