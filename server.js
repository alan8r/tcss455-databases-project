// Back-end (Node.js using Express.js and MySQL)
const express = require('express');
const mysql = require('mysql');
// Import the cors middleware
const cors = require('cors');
const app = express();
//An Express.js middleware setup that enables CORS for the Express application
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '00000000',
  database: 'test1'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/book', (req, res) => {
  db.query('SELECT * FROM book', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/user', (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/borrowed', (req, res) => {
  db.query('SELECT * FROM borrowed', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
