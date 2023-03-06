"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = void 0;
function setupDatabase(client) {
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
    return client;
}
exports.setupDatabase = setupDatabase;
