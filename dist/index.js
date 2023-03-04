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
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});
client.connect();
client.query(`SELECT EXISTS (
  SELECT 1 FROM pg_type WHERE typname = 'subject_enum'
);`).then((result) => {
    if (!result.rows[0].exists) {
        client.query(`CREATE TYPE subject_enum AS ENUM ('Math', 'Science', 'History', 'English', 'Art', 'Music');`);
    }
    else {
        console.log('subject_enum already exists');
    }
}).catch((err) => {
    console.log('created subject_enum');
    client.query(`CREATE TYPE subject_enum AS ENUM ('Math', 'Science', 'History', 'English', 'Art', 'Music');`);
});
client.query(`
CREATE TABLE IF NOT EXISTS tutor (
  id SERIAL PRIMARY KEY,
  subjects subject_enum[] NOT NULL,
  about_me VARCHAR(255),
  available_hours BYTEA[] NOT NULL,
  profile_picture BYTEA
);

CREATE TABLE IF NOT EXISTS student (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  total_tutoring_hours INT,
  tutor_id INT REFERENCES tutor(id)
);

CREATE TABLE IF NOT EXISTS favorite (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES student(id),
  tutor_id INT NOT NULL REFERENCES tutor(id)
);

CREATE TABLE IF NOT EXISTS appointment (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time BYTEA NOT NULL,
  student_id INT NOT NULL REFERENCES student(id),
  tutor_id INT NOT NULL REFERENCES tutor(id)
);`);
/*
client.query(createTablesQuery)
  .then(() => {
    console.log('Tables created successfully');
    client.end();
  })
  .catch((err) => {
    console.error('Error creating tables:', err);
    client.end();
  });*/
const app = (0, express_1.default)();
/** FROM CHATGPT when we need to start connecting PostgreSQL
 * const express = require('express');
const { Pool } = require('pg');

const app = express();

// Create a pool of database connections
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432,
});

// Define a GET endpoint for retrieving data from the database
app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM your_table_name');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
 */
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>');
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// Array of example users for testing purposes
const users = [
    {
        id: 1,
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123'
    },
    {
        id: 3,
        name: 'Akilan Gnanavel',
        email: 'akilan.vel@hotmail.com',
        password: 'kianishot69'
    },
    {
        id: 4,
        name: 'Kian Lak',
        email: 'kian.lak@gmail.com',
        password: 'akilanishot69'
    }
];
// route login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => {
        return user.email === email && user.password === password;
    });
    if (!user) {
        return res.status(404).send('User Not Found!');
    }
    return res.status(200).json(user);
});
app.post('/tutors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.post('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
