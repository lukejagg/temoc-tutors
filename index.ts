import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();

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

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


interface FormInputs {
    email: string,
    password: string
}

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
app.post('/login', (req: Request, res: Response) => {
    const { email, password }:FormInputs = req.body;

    const user = users.find(user => {
    return user.email === email && user.password === password
    });

    if (!user) {
    return res.status(404).send('User Not Found!')
    }

    return res.status(200).json(user)
});

