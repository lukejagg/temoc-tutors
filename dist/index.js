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
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const sessionAuthentication_1 = require("./sessionAuthentication");
dotenv_1.default.config();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const multer_1 = __importDefault(require("multer"));
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
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
app.post('/student/all/favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT tutor.*, favorite.id AS favorite_id FROM tutor INNER JOIN favorite ON tutor.id = favorite.tutor_id WHERE favorite.student_id = $1', [id]);
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        }
        else {
            res.status(401).send('Error loading subjects');
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
    let query_base = 'SELECT * FROM tutor JOIN tutor_schedule ON tutor.id = tutor_schedule.tutor_id WHERE ';
    let data_list = [];
    let counter = 1;
    if (username) {
        query_base += ` tutor.username = $${counter} AND`;
        data_list.push(username);
        counter++;
    }
    if (date) {
        query_base += ` tutor_schedule.day = $${counter} AND`;
        data_list.push(date);
        counter++;
    }
    else if (start_time || end_time || username || subject) {
        query_base += ` CAST(tutor_schedule.day AS DATE) >= CURRENT_DATE AND`;
    }
    if (start_time) {
        query_base += ` tutor_schedule.start_time >= $${counter}  AND`;
        data_list.push(start_time);
        counter++;
    }
    if (end_time) {
        query_base += ` tutor_schedule.end_time <= $${counter} AND`;
        data_list.push(end_time);
        counter++;
    }
    if (subject) {
        query_base += ` $${counter} = ANY(tutor.subjects) AND`;
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
app.post('/load/tutor/information', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT * FROM tutor WHERE id = $1', [id]);
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
// Sign Up Request
app.post('/signup', upload.single('profile_pic'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { username, email, password } = req.body;
    try {
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        password = hash;
        const profile_pic = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const result = yield client.query('INSERT INTO student (username, email, password, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, password, profile_pic]);
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
app.post('/user/new/tutor', upload.single('profile_picture'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let { username, email, password, subject, about_me } = req.body;
    try {
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        password = hash;
        const profile_picture = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        // Parse the subject array
        const subjects = JSON.parse(subject);
        const result = yield client.query('INSERT INTO tutor (username, email, password, subjects, profile_picture, about_me) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, password, subjects, profile_picture, about_me]);
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
app.get('/user/tutor/:id/profile_picture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorId = req.params.id;
    try {
        const result = yield client.query('SELECT profile_picture FROM tutor WHERE id = $1', [tutorId]);
        if (result.rowCount === 1) {
            const profile_picture_path = result.rows[0].profile_picture;
            if (profile_picture_path == null) {
                res.status(404).send('Profile picture not found');
            }
            else {
                const profile_picture_extension = path_1.default.extname(profile_picture_path);
                res.set('Content-Type', `image/${profile_picture_extension.substring(1)}`);
                res.sendFile(path_1.default.resolve(profile_picture_path));
            }
        }
        else {
            res.status(404).send('Profile picture not found');
        }
    }
    catch (err) {
        console.error('Error getting profile picture:', err);
        res.status(500).send('Error getting profile picture');
    }
}));
app.get('/user/student/:id/profile_picture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    try {
        const result = yield client.query('SELECT profile_pic FROM student WHERE id = $1', [studentId]);
        if (result.rowCount === 1) {
            const profile_picture_path = result.rows[0].profile_pic;
            if (profile_picture_path == null) {
                res.status(404).send('Profile picture not found');
            }
            else {
                const profile_picture_extension = path_1.default.extname(profile_picture_path);
                res.set('Content-Type', `image/${profile_picture_extension.substring(1)}`);
                res.sendFile(path_1.default.resolve(profile_picture_path));
            }
        }
        else {
            res.status(404).send('Profile picture not found');
        }
    }
    catch (err) {
        console.error('Error getting profile picture:', err);
        res.status(500).send('Error getting profile picture');
    }
}));
app.post('/retrieve/tutor/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT tutor_id FROM tutor_schedule WHERE id = $1', [id]);
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
app.post('/alltutors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT tutor.id, tutor.username, tutor.subjects, favorite.id AS favorite_id FROM tutor LEFT JOIN favorite ON favorite.tutor_id = tutor.id AND favorite.student_id = $1', [id]);
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
app.post('/api/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor_id, favorite_id, student_id } = req.body;
    try {
        const result = yield client.query('INSERT INTO favorite (tutor_id, student_id) VALUES ($1, $2) RETURNING *', [tutor_id, student_id]);
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
app.post('/delete/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tutor_id, favorite_id, student_id } = req.body;
    try {
        const result = yield client.query('DELETE FROM favorite WHERE tutor_id = $1 AND student_id = $2', [tutor_id, student_id]);
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
app.post('/all/student/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, today } = req.body;
    try {
        const result = yield client.query('SELECT appointment.*, tutor.username, tutor.about_me FROM appointment INNER JOIN tutor ON appointment.tutor_id = tutor.id WHERE appointment.student_id = $1 AND CAST(appointment.date AS DATE) >= CURRENT_DATE', [id]);
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
app.post('/all/tutor/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, today } = req.body;
    try {
        const result = yield client.query('SELECT appointment.*, student.username FROM appointment INNER JOIN student ON appointment.student_id = student.id WHERE appointment.tutor_id = $1 AND CAST(appointment.date AS DATE) >= CURRENT_DATE', [id]);
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
app.post('/student/hours', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT time_start, time_end FROM appointment WHERE student_id = $1 AND ((date = CURRENT_DATE AND time_end < CURRENT_TIME) OR (date < CURRENT_DATE))', [id]);
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
app.post('/tutor/hours', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const result = yield client.query('SELECT time_start, time_end FROM appointment WHERE tutor_id = $1 AND ((date = CURRENT_DATE AND time_end < CURRENT_TIME) OR (date < CURRENT_DATE))', [id]);
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
app.post('/confirm/send/schedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, start_time, end_time, day } = req.body;
    try {
        const result = yield client.query(`INSERT INTO tutor_schedule (tutor_id, day, start_time, end_time) 
      SELECT $1, $2, $3, $4
      WHERE NOT EXISTS (
        SELECT 1 
        FROM tutor_schedule 
        WHERE tutor_id = $1 
          AND day = $2 
          AND (($3 BETWEEN start_time AND end_time) OR ($4 BETWEEN start_time AND end_time))
      ) AND NOT EXISTS (
        SELECT 1 
        FROM appointment 
        WHERE tutor_id = $1 
          AND date = $2 
          AND (($3 BETWEEN time_start AND time_end) OR ($4 BETWEEN time_start AND time_end))
      )
       RETURNING *;`, [id, day, start_time, end_time]);
        if (result.rowCount === 1) {
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
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
