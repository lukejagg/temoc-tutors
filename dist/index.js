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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Postgres Database
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});
client.connect();
// Initialize Database Schema
const database_1 = require("./database");
(0, database_1.setupDatabase)(client);
// Backend application
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>');
});
/*
TODO:
0. Update each api endpoint as needed
1. Make if the insert auto-sets the id value
*/
app.post('/tutors/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hey");
    const { subjects, aboutMe, availableHours, profilePicture } = req.body;
    try {
        const result = yield client.query('INSERT INTO tutor (subjects, about_me, available_hours, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *', [subjects, aboutMe, availableHours, profilePicture]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error creating tutor:', err);
        res.status(500).send('Error creating tutor');
    }
}));
app.post('/tutors/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield client.query('SELECT * FROM tutor WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(401).send('Invalid email or password');
        }
    }
    catch (err) {
        console.error('Error logging in tutor:', err);
        res.status(500).send('Error logging in tutor');
    }
}));
app.post('/students/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const result = yield client.query('INSERT INTO student (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error creating student:', err);
        res.status(500).send('Error creating student');
    }
}));
app.post('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, tutorId } = req.body;
    try {
        const result = yield client.query('INSERT INTO favorite (student_id, tutor_id) VALUES ($1, $2) RETURNING *', [studentId, tutorId]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error creating favorite:', err);
        res.status(500).send('Error creating favorite');
    }
}));
app.get('/favorites/:studentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.studentId);
    try {
        const result = yield client.query('SELECT * FROM favorite WHERE student_id = $1', [studentId]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getting favorites:', err);
        res.status(500).send('Error getting favorites');
    }
}));
app.get('/appointments/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const result = yield client.query('SELECT * FROM appointment WHERE student_id = $1 OR tutor_id = $1', [userId]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getting appointments:', err);
        res.status(500).send('Error getting appointments');
    }
}));
app.post('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, studentId, tutorId } = req.body;
    try {
        const result = yield client.query('INSERT INTO appointment (date, time, student_id, tutor_id) VALUES ($1, $2, $3, $4) RETURNING *', [date, time, studentId, tutorId]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error creating appointment:', err);
        res.status(500).send('Error creating appointment');
    }
}));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
