import express, { Express, Request, Response } from "express";
import { Client } from 'pg';
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { setupDatabase } from "./db";
import { createSessionID } from "./sessionAuthentication";

dotenv.config();

// Initialize Postgres Database
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

client.connect();

// Initialize Database Schema
setupDatabase(client);

// Backend application
const app: Express = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>')
});

// Login Request
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM student WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// Session ID generation
app.post('/session', (req, res) => {
  const result = createSessionID();
  res.json(result);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
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