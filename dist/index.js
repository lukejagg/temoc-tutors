"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const sessionAuthentication_1 = require("./sessionAuthentication");
dotenv_1.default.config();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
// Initialize Postgres Database
const client = new pg_1.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});
client.connect();
// Initialize Database Schema
(0, db_1.setupDatabase)(client);
// Backend application
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>');
});
// Login Request
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        const result = yield client.query('SELECT * FROM student WHERE email = $1', [email]);
        const hash = result.rows[0].password;
        const match = yield bcrypt.compare(password, hash);
        if (result.rows.length > 0 && match) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('Invalid email or password');
        }
    }
    catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
}));
// Login Request
app.post('/tutorlogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield client.query('SELECT * FROM tutor WHERE email = $1', [email]);
        const hash = result.rows[0].password;
        const match = yield bcrypt.compare(password, hash);
        if (result.rows.length > 0 && match) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('Invalid email or password');
        }
    }
    catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
}));
// User ID Request
app.post('/login/userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const result = yield client.query('SELECT id FROM student WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('User does not exist');
        }
    }
    catch (err) {
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}));
app.post('/login/tutor/userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const result = yield client.query('SELECT id FROM tutor WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('User does not exist');
        }
    }
    catch (err) {
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}));
// Session ID generation
app.post('/session', (req, res) => {
    const result = (0, sessionAuthentication_1.createSessionID)();
    res.json(result);
});
// Sign Up Request
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    try {
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        password = hash;
        const result = yield client.query('INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
        if (result.rowCount === 1) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('Error signing up');
        }
    }
    catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Error signing up');
    }
}));
app.post('/appointment/date', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, date } = req.body;
    try {
        const result = yield client.query('SELECT appointment.id, appointment.time_start, appointment.time_end, appointment.tutor_id, tutor.username FROM appointment JOIN tutor ON appointment.tutor_id = tutor.id WHERE appointment.student_id = $1 AND appointment.date = to_date($2, \'YYYY-MM-DD\')', [id, date]);
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading appointments');
        }
    }
    catch (err) {
        console.error('Error loading appointments', err);
        res.status(500).send('Error loading appointments');
    }
}));
app.post('/appointment/tutor/date', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, date } = req.body;
    try {
        const result = yield client.query('SELECT appointment.id, appointment.time_start, appointment.time_end, appointment.student_id, student.username FROM appointment JOIN student ON appointment.student_id = student.id WHERE appointment.tutor_id = $1 AND appointment.date = to_date($2, \'YYYY-MM-DD\')', [id, date]);
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading appointments');
        }
    }
    catch (err) {
        console.error('Error loading appointments', err);
        res.status(500).send('Error loading appointments');
    }
}));
app.post('/subjects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query('SELECT unnest(enum_range(NULL::subject_enum))::text as subject_type');
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading subjects');
        }
    }
    catch (err) {
        console.error('Error loading subjects', err);
        res.status(500).send('Error loading subjects');
    }
}));
app.post('/appointment/student/request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, date, start_time, end_time, subject } = req.body;
    let query_base = 'SELECT * FROM tutor JOIN tutor_schedule ON tutor.id = tutor_schedule.tutor_id WHERE';
    let data_list = [];
    let counter = 1;
    if (username) {
        query_base += ` tutor.username = $${counter} AND`;
        data_list.push(username);
        counter++;
    }
    if (date) {
        query_base += ` tutor_schedule.day = $${counter}  AND`;
        data_list.push(date);
        counter++;
    }
    if (start_time) {
        query_base += ` tutor_schedule.start_time >= $${counter}  AND`;
        data_list.push(start_time);
        counter++;
    }
    if (end_time) {
        query_base += ` tutor_schedule.end_time <= $${counter}  AND`;
        data_list.push(end_time);
        counter++;
    }
    if (subject) {
        query_base += ` $${counter} = ANY(tutor.subjects)  AND`;
        data_list.push(subject);
        counter++;
    }
    query_base = query_base.slice(0, -4);
    try {
        const result = yield client.query(query_base, data_list);
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading subjects');
        }
    }
    catch (err) {
        console.error('Error loading subjects', err);
        res.status(500).send('Error loading subjects');
    }
}));
app.post('/appointment/confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, start_time, end_time, date } = req.body;
    try {
        const result = yield client.query('SELECT * FROM appointment WHERE student_id = $1 AND date = $2 AND (($3 BETWEEN time_start AND time_end) OR ($4 BETWEEN time_start AND time_end))', [id, date, start_time, end_time]);
        if (result.rows.length !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading subjects');
        }
    }
    catch (err) {
        console.error('Error loading subjects', err);
        res.status(500).send('Error loading subjects');
    }
}));
app.post('/tutor/schedule/appointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor_id, start_time, end_time, date } = req.body;
    try {
        const result = yield client.query('INSERT INTO tutor_schedule (tutor_id, day, start_time, end_time) VALUES ($1, $2, $3, $4)', [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error inserting new adjustments');
        }
    }
    catch (err) {
        console.error('Error inserting new adjustments', err);
        res.status(500).send('Error inserting new adjustments');
    }
}));
app.post('/tutor/schedule/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor_id, start_time, end_time, date } = req.body;
    try {
        const result = yield client.query('DELETE FROM tutor_schedule WHERE tutor_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4', [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error inserting new adjustments');
        }
    }
    catch (err) {
        console.error('Error inserting new adjustments', err);
        res.status(500).send('Error inserting new adjustments');
    }
}));
app.post('/tutor/schedule/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor_id, start_time, end_time, date } = req.body;
    try {
        const result = yield client.query('SELECT * FROM tutor_schedule WHERE tutor_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4', [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error inserting new adjustments');
        }
    }
    catch (err) {
        console.error('Error inserting new adjustments', err);
        res.status(500).send('Error inserting new adjustments');
    }
}));
app.post('/user/new/appointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student_id, tutor_id, start_time, end_time, date, subject } = req.body;
    try {
        const result = yield client.query('INSERT INTO appointment (student_id, tutor_id, time_start, time_end, date, subject) VALUES ($1, $2, $3, $4, $5, $6)', [student_id, tutor_id, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00", date, subject]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error inserting new adjustments');
        }
    }
    catch (err) {
        console.error('Error inserting new adjustments', err);
        res.status(500).send('Error inserting new adjustments');
    }
}));
app.post('/user/new/tutor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password, subject } = req.body;
    try {
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        password = hash;
        const result = yield client.query('INSERT INTO tutor (username, email, password, subjects) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, password, subject]);
        if (result.rowCount === 1) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('Error signing up');
        }
    }
    catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Error signing up');
    }
}));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/*
TODO:
0. Update each api endpoint as needed
1. Make if the insert auto-sets the id value
*/
// app.post('/tutors/create', async (req: Request, res: Response) => {
//   console.log("hey")
//   const { subjects, aboutMe, availableHours, profilePicture } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO tutor (subjects, about_me, available_hours, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *',
//       [subjects, aboutMe, availableHours, profilePicture]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating tutor:', err);
//     res.status(500).send('Error creating tutor');
//   }
// });
// app.post('/students/create', async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING *',
//       [username, email, password]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating student:', err);
//     res.status(500).send('Error creating student');
//   }
// });
// app.post('/favorites', async (req: Request, res: Response) => {
//   const { studentId, tutorId } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO favorite (student_id, tutor_id) VALUES ($1, $2) RETURNING *',
//       [studentId, tutorId]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating favorite:', err);
//     res.status(500).send('Error creating favorite');
//   }
// });
// app.get('/favorites/:studentId', async (req: Request, res: Response) => {
//   const studentId = parseInt(req.params.studentId);
//   try {
//     const result = await client.query(
//       'SELECT * FROM favorite WHERE student_id = $1',
//       [studentId]
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error getting favorites:', err);
//     res.status(500).send('Error getting favorites');
//   }
// });
// app.get('/appointments/:userId', async (req: Request, res: Response) => {
//   const userId = parseInt(req.params.userId);
//   try {
//     const result = await client.query(
//       'SELECT * FROM appointment WHERE student_id = $1 OR tutor_id = $1',
//       [userId]
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error getting appointments:', err);
//     res.status(500).send('Error getting appointments');
//   }
// });
// app.post('/appointments', async (req: Request, res: Response) => {
//   const { date, time, studentId, tutorId } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO appointment (date, time, student_id, tutor_id) VALUES ($1, $2, $3, $4) RETURNING *',
//       [date, time, studentId, tutorId]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating appointment:', err);
//     res.status(500).send('Error creating appointment');
//   }
// });
app.post('/student/new/profileUpdate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, profile_picture, id } = req.body;
    let query_base = 'UPDATE student SET ';
    let query_end = ' WHERE id = $1';
    let data_list = [];
    let counter = 2;
    if (username) {
        query_base += `username = $${counter}, `;
        data_list.push(username);
        counter++;
    }
    if (email) {
        query_base += `email = $${counter}, `;
        data_list.push(email);
        counter++;
    }
    if (password) {
        query_base += `password = $${counter}, `;
        data_list.push(password);
        counter++;
    }
    if (profile_picture) {
        query_base += `profile_picture = $${counter}, `;
        data_list.push(profile_picture);
        counter++;
    }
    query_base = query_base.slice(0, -2);
    query_base += query_end;
    try {
        const result = yield client.query(query_base, data_list);
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading subjects');
        }
    }
    catch (err) {
        console.error('Error loading subjects', err);
        res.status(500).send('Error loading subjects');
    }
}));
