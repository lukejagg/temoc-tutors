import express, { Express, Request, Response } from "express";
import { Client } from 'pg';
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { setupDatabase } from "./db";
import { createSessionID } from "./sessionAuthentication";

dotenv.config();

const bcrypt = require('bcryptjs');
const saltRounds = 10;

import multer from 'multer';
import fs from 'fs';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
  let { email, password } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM student WHERE email = $1',
      [email]
    );
    
    const hash = result.rows[0].password;
    const match = await bcrypt.compare(password, hash);

    if(result.rows.length > 0 && match) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// Login Request
app.post('/tutorlogin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM tutor WHERE email = $1',
      [email]
    );

    const hash = result.rows[0].password;
    const match = await bcrypt.compare(password, hash);

    if(result.rows.length > 0 && match) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// User ID Request
app.post('/login/userid', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await client.query(
      'SELECT id FROM student WHERE email = $1',
      [email]
    );
    if(result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('User does not exist');
    }
  } catch (err) {
    console.error('Error retrieving user', err);
    res.status(500).send('Error retrieving user');
  }
});

app.post('/student/all/favorite', async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const result = await client.query(
      'SELECT tutor.*, favorite.id AS favorite_id FROM tutor INNER JOIN favorite ON tutor.id = favorite.tutor_id WHERE favorite.student_id = $1',
      [id]
    );
    if(result.rowCount !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading subjects');
    }
  } catch (err) {
    console.error('Error retrieving user', err);
    res.status(500).send('Error retrieving user');
  }
});

app.post('/login/tutor/userid', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await client.query(
      'SELECT id FROM tutor WHERE email = $1',
      [email]
    );
    if(result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('User does not exist');
    }
  } catch (err) {
    console.error('Error retrieving user', err);
    res.status(500).send('Error retrieving user');
  }
});

// Session ID generation
app.post('/session', (req, res) => {
  const result = createSessionID();
  res.json(result);
});

app.post('/appointment/date', async (req: Request, res: Response) => {
  const { id, date } = req.body;

  try {
    const result = await client.query(
      'SELECT appointment.id, appointment.time_start, appointment.time_end, appointment.tutor_id, tutor.username FROM appointment JOIN tutor ON appointment.tutor_id = tutor.id WHERE appointment.student_id = $1 AND appointment.date = to_date($2, \'YYYY-MM-DD\')',
      [id, date]
    );
    if(result.rowCount !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading appointments');
    }
  } catch (err) {
    console.error('Error loading appointments', err);
    res.status(500).send('Error loading appointments');
  }  
});

app.post('/appointment/tutor/date', async (req: Request, res: Response) => {
  const { id, date } = req.body;

  try {
    const result = await client.query(
      'SELECT appointment.id, appointment.time_start, appointment.time_end, appointment.student_id, student.username FROM appointment JOIN student ON appointment.student_id = student.id WHERE appointment.tutor_id = $1 AND appointment.date = to_date($2, \'YYYY-MM-DD\')',
      [id, date]
    );
    if(result.rowCount !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading appointments');
    }
  } catch (err) {
    console.error('Error loading appointments', err);
    res.status(500).send('Error loading appointments');
  }  
});


app.post('/subjects', async (req: Request, res: Response) => {
  try {
    const result = await client.query(
        'SELECT unnest(enum_range(NULL::subject_enum))::text as subject_type'
      );
    if(result.rowCount !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading subjects');
    }
  } catch (err) {
    console.error('Error loading subjects', err);
    res.status(500).send('Error loading subjects');
  }  
});

app.post('/appointment/student/request', async (req: Request, res: Response) => {
  const { username, date, start_time, end_time, subject } = req.body;
  
  let query_base = 'SELECT * FROM tutor JOIN tutor_schedule ON tutor.id = tutor_schedule.tutor_id WHERE '
  let data_list = [];
  let counter = 1;

  if(username) {
    query_base += ` tutor.username = $${counter} AND`;
    data_list.push(username);
    counter++;
  }

  if(date) {
    query_base += ` tutor_schedule.day = $${counter} AND`;
    data_list.push(date);
    counter++;
  } else if(start_time || end_time || username || subject) {
    query_base += ` CAST(tutor_schedule.day AS DATE) >= CURRENT_DATE AND`;
  }
  
  if(start_time) {
    query_base += ` tutor_schedule.start_time >= $${counter}  AND`;
    data_list.push(start_time);
    counter++;
  }

  if(end_time) {
    query_base += ` tutor_schedule.end_time <= $${counter} AND`;
    data_list.push(end_time);
    counter++;
  }

  if(subject) {
    query_base += ` $${counter} = ANY(tutor.subjects) AND`;
    data_list.push(subject);
    counter++;
  }

  query_base = query_base.slice(0, -4);

  try {
    const result = await client.query(query_base, data_list);
    if(result.rowCount !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading subjects');
    }
  } catch (err) {
    console.error('Error loading subjects', err);
    res.status(500).send('Error loading subjects');
  }  

});

app.post('/load/tutor/information', async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM tutor WHERE id = $1',
      [id]
    );

    
    if(result.rows.length !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading subjects');
    }
  } catch (err) {
    console.error('Error loading subjects', err);
    res.status(500).send('Error loading subjects');
  }  
});

app.post('/appointment/confirmation', async (req: Request, res: Response) => {
  const { id, start_time, end_time, date} = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM appointment WHERE student_id = $1 AND date = $2 AND (($3 BETWEEN time_start AND time_end) OR ($4 BETWEEN time_start AND time_end))',
      [id, date, start_time, end_time]
    );

    
    if(result.rows.length !== 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error loading subjects');
    }
  } catch (err) {
    console.error('Error loading subjects', err);
    res.status(500).send('Error loading subjects');
  }  
});

app.post('/tutor/schedule/appointment', async (req: Request, res: Response) => {
  const { tutor_id, start_time, end_time, date} = req.body;

  try {
    const result = await client.query(
      'INSERT INTO tutor_schedule (tutor_id, day, start_time, end_time) VALUES ($1, $2, $3, $4)',
      [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]
    );

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/tutor/schedule/delete', async (req: Request, res: Response) => {
  const { tutor_id, start_time, end_time, date} = req.body;

  try {
    const result = await client.query(
      'DELETE FROM tutor_schedule WHERE tutor_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4',
      [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]
    );

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/tutor/schedule/check', async (req: Request, res: Response) => {
  const { tutor_id, start_time, end_time, date} = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM tutor_schedule WHERE tutor_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4',
      [tutor_id, date, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00"]
    );

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/user/new/appointment', async (req: Request, res: Response) => {
  const { student_id, tutor_id, start_time, end_time, date, subject} = req.body;

  try {
    const result = await client.query(
      'INSERT INTO appointment (student_id, tutor_id, time_start, time_end, date, subject) VALUES ($1, $2, $3, $4, $5, $6)',
      [student_id, tutor_id, start_time.slice(0, -3) + ":00", end_time.slice(0, -3) + ":00", date, subject]
    );

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});


// Sign Up Request
app.post('/signup', upload.single('profile_pic'), async (req: Request, res: Response) => {
  let { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    const profile_pic = req.file?.path;

    const result = await client.query(
      'INSERT INTO student (username, email, password, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, profile_pic]
    );
    if(result.rowCount === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('Error signing up');
    }
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).send('Error signing up');
  }  
});

app.post('/user/new/tutor', upload.single('profile_picture'), async (req: Request, res: Response) => {
  let { username, email, password, subject, about_me } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    const profile_picture = req.file?.path;

    // Parse the subject array
    const subjects = JSON.parse(subject);

    const result = await client.query(
      'INSERT INTO tutor (username, email, password, subjects, profile_picture, about_me) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, email, password, subjects, profile_picture, about_me]
    );

    if (result.rowCount === 1) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).send('Error signing up');
    }
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).send('Error signing up');
  }
});

app.get('/user/tutor/:id/profile_picture', async (req: Request, res: Response) => {
  const tutorId = req.params.id;

  try {
    const result = await client.query('SELECT profile_picture FROM tutor WHERE id = $1', [tutorId]);
    if (result.rowCount === 1) {
      const profile_picture_path = result.rows[0].profile_picture;
      if (profile_picture_path == null) {
        res.status(404).send('Profile picture not found');
      } else {
        const profile_picture_extension = path.extname(profile_picture_path);
        res.set('Content-Type', `image/${profile_picture_extension.substring(1)}`);
        res.sendFile(path.resolve(profile_picture_path));
      }
    } else {
      res.status(404).send('Profile picture not found');
    }
  } catch (err) {
    console.error('Error getting profile picture:', err);
    res.status(500).send('Error getting profile picture');
  }
});

app.get('/user/student/:id/profile_picture', async (req: Request, res: Response) => {
  const studentId = req.params.id;

  try {
    const result = await client.query('SELECT profile_pic FROM student WHERE id = $1', [studentId]);
    if (result.rowCount === 1) {
      const profile_picture_path = result.rows[0].profile_pic;
      if (profile_picture_path == null) {
        res.status(404).send('Profile picture not found');
      } else {
        const profile_picture_extension = path.extname(profile_picture_path);
        res.set('Content-Type', `image/${profile_picture_extension.substring(1)}`);
        res.sendFile(path.resolve(profile_picture_path));
      }
    } else {
      res.status(404).send('Profile picture not found');
    }
  } catch (err) {
    console.error('Error getting profile picture:', err);
    res.status(500).send('Error getting profile picture');
  }
});

app.post('/retrieve/tutor/id', async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const result = await client.query(
      'SELECT tutor_id FROM tutor_schedule WHERE id = $1',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/alltutors', async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await client.query(
      'SELECT tutor.id, tutor.username, tutor.subjects, favorite.id AS favorite_id FROM tutor LEFT JOIN favorite ON favorite.tutor_id = tutor.id AND favorite.student_id = $1',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/api/favorites', async (req: Request, res: Response) => {
  const { tutor_id, favorite_id, student_id } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO favorite (tutor_id, student_id) VALUES ($1, $2) RETURNING *',
      [tutor_id, student_id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/delete/favorites', async (req: Request, res: Response) => {
  const { tutor_id, favorite_id, student_id } = req.body;
  try {
    const result = await client.query(
      'DELETE FROM favorite WHERE tutor_id = $1 AND student_id = $2',
      [tutor_id, student_id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});



app.post('/all/student/appointments', async (req: Request, res: Response) => {
  const { id, today } = req.body;
  try {
    const result = await client.query(
      'SELECT appointment.*, tutor.username, tutor.about_me FROM appointment INNER JOIN tutor ON appointment.tutor_id = tutor.id WHERE appointment.student_id = $1 AND CAST(appointment.date AS DATE) >= CURRENT_DATE',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/all/tutor/appointments', async (req: Request, res: Response) => {
  const { id, today } = req.body;
  try {
    const result = await client.query(
      'SELECT appointment.*, student.username FROM appointment INNER JOIN student ON appointment.student_id = student.id WHERE appointment.tutor_id = $1 AND CAST(appointment.date AS DATE) >= CURRENT_DATE',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/student/hours', async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await client.query(
      'SELECT time_start, time_end FROM appointment WHERE student_id = $1 AND ((date = CURRENT_DATE AND time_end < CURRENT_TIME) OR (date < CURRENT_DATE))',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/tutor/hours', async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await client.query(
      'SELECT time_start, time_end FROM appointment WHERE tutor_id = $1 AND ((date = CURRENT_DATE AND time_end < CURRENT_TIME) OR (date < CURRENT_DATE))',
      [id]
    );    

    if(result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

app.post('/confirm/send/schedule', async (req: Request, res: Response) => {
  const { id, start_time, end_time, day } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO tutor_schedule (tutor_id, day, start_time, end_time) 
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
       RETURNING *;`,
      [id, day, start_time, end_time]
    );    

    if(result.rowCount === 1) {
      res.status(200).json(result.rows);
    } else {
      res.status(401).send('Error inserting new adjustments');
    }
  } catch (err) {
    console.error('Error inserting new adjustments', err);
    res.status(500).send('Error inserting new adjustments');
  }  
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});