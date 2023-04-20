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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = void 0;
function setupDatabase(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'subject_enum'
      );
    `);
            if (!result.rows[0].exists) {
                yield client.query(`
        CREATE TYPE subject_enum AS ENUM ('Math', 'Science', 'History', 'English', 'Art', 'Music');
      `);
            }
            else {
                console.log('subject_enum already exists');
            }
            yield client.query(`
      CREATE TABLE IF NOT EXISTS tutor (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        subjects subject_enum[] NOT NULL,
        about_me VARCHAR(255),
        profile_picture BYTEA
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
        total_tutoring_hours INT
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
        tutor_id INT NOT NULL REFERENCES tutor(id)
      );
    `);
            return client;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.setupDatabase = setupDatabase;
