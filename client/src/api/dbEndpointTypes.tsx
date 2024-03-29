import { Dayjs } from "dayjs";
import { AnyMxRecord } from "dns";

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
    profile_pic: File | null | undefined;
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

export interface TutorScheduleAppointment {
    tutor_id: string;
    start_time: string | null;
    end_time: string | null;
    date: string | null;
}

export interface AppointmentReservation {
    student_id: string | null,
    tutor_id: string | null,
    start_time: string | null,
    end_time: string | null,
    date: string | null,
    subject: string | null
}

export interface TutorCreationRequest{
    email: string,
    username: string,
    password: string,
    profile_picture: File | null | undefined,
    subject: string[],
    about_me: string | null
}

export interface TutorAll{
    id: string | null;
}

export interface TutorFav {
    tutor_id: string | null;
    username: string;
    subjects: string;
    favorite_id: string | null;
    student_id: string | null;
}

export interface IdForTutorProfilePicture {
    id: string | null;
}

export interface ConfirmationSubmissionSchedule {
    id: string | null;
    start_time: string | null,
    end_time: string | null,
    day: string | null
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
