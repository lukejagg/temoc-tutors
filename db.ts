import { Client } from 'pg';

export async function setupDatabase(client: Client) {
  try {
    const result = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'subject_enum'
      );
    `);

    if (!result.rows[0].exists) {
      await client.query(`
        CREATE TYPE subject_enum AS ENUM ('Math', 'Science', 'History', 'English', 'Art', 'Music');
      `);
    } else {
      console.log('subject_enum already exists');
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS tutor (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        subjects subject_enum[] NOT NULL,
        about_me VARCHAR(255),
        profile_picture BYTEA,
        total_tutoring_hours INT
      );
      
      CREATE TABLE IF NOT EXISTS tutor_schedule (
        id SERIAL PRIMARY KEY,
        tutor_id INTEGER NOT NULL REFERENCES tutor(id),
        day DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS student (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        total_tutoring_hours INT,
        profile_picture BYTEA
      );
      
      CREATE TABLE IF NOT EXISTS favorite (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL REFERENCES student(id),
        tutor_id INT NOT NULL REFERENCES tutor(id)
      );
      
      CREATE TABLE IF NOT EXISTS appointment (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        time_start TIME NOT NULL,
        time_end TIME NOT NULL,
        student_id INT NOT NULL REFERENCES student(id),
        tutor_id INT NOT NULL REFERENCES tutor(id),
        subject VARCHAR(255) NOT NULL
      );
    `);

    return client;
  } catch (err) {
    console.error(err);
  }
}