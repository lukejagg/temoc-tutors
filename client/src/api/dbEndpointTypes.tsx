export interface LoginRequest {
    email: string;
    password: string;
}

// Interfaces for tutor-related endpoints
export interface Tutor {
    id: number;
    subjects: string[];
    aboutMe: string;
    availableHours: Uint8Array[];
    profilePicture: Uint8Array | null;
}


// Interfaces for student-related endpoints
export interface Student {
    id: number;
    username: string;
    email: string;
    password: string;
    totalTutoringHours: number;
    tutorId: number | null;
}

export interface Favorite {
    id: number;
    studentId: number;
    tutorId: number;
}

// Interfaces for appointment-related endpoints
export interface Appointment {
    id: number;
    date: string;
    time: Uint8Array;
    studentId: number;
    tutorId: number;
}

export interface AppointmentRequest {
    date: string;
    time: Uint8Array;
    studentId: number;
    tutorId: number;
}





export interface StudentCreationRequest {
    username: string;
    email: string;
    password: string;
}