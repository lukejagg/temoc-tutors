# README

This project was developed for CS 4485 Team 21

## Installation

Use two terminals, one for the server, and one for the client

### Server

npm install

### Client

cd client
npm install

## Execution

### Server

npm run dev

### Client

cd client
npm start

## Tech stack

React.JS: v18.2.0

Node.JS: v18.14.0

Express: v4.18.2

PostgreSQL: v15.2

[Tailwind](https://tailwindcss.com/docs/guides/create-react-app)

## Database Setup

[Download and Setup PostgreSQL Account](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

### PGAdmin 4

Used to setup DB schema. Run in the background to view data/interact with database

## Root Directory Addition

Create a .env file in the root directory, this will be the credentials the server needs to access the database.
In the .env file put in information in this format:

```
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=[username]
PG_PASSWORD=[password]
PG_PORT=5432
```
