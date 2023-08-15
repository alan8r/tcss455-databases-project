// Back-end (Node.js using Express.js and MySQL)
const express = require('express');
const mysql = require('mysql');
// Import the cors middleware
const cors = require('cors');
const app = express();
//An Express.js middleware setup that enables CORS for the Express application
app.use(cors());
// Parse JSON requests
app.use(express.json());

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
  let query = 'SELECT * FROM book';
  // Check if a sort parameter is provided in the query string
  if (req.query.sort === 'book_id') {
    query += ' ORDER BY book_id'; // Sort by book_id
  }
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching book data:', error);
      return res.status(500).json({ error: 'Error fetching book data' });
    }
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


// Write data into book table
app.post('/addBook', (req, res) => {
  const bookData = req.body; // Assuming the request body contains the book data in JSON format
  console.log('Received book data:', bookData);
  const sql = `
    INSERT INTO book (ISBN, book_id, title, author, subject, publish_year, edition)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    bookData.ISBN,
    bookData.book_id,
    bookData.title,
    bookData.author,
    bookData.subject,
    bookData.publish_year,
    bookData.edition
  ];
  console.log(values);
  // Execute the SQL query
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error adding book:', error);
      return res.status(500).json({ error: 'Error adding book', sqlError: error.message });
    }
    console.log('Book added successfully');
    res.status(200).json({ message: 'Book added successfully' });
  });
});

// Write data into user table
app.post('/addUser', (req, res) => {
  const userData = req.body; // Assuming the request body contains the book data in JSON format
  console.log('Received user data:', userData);
  const sql = `
    INSERT INTO user (user_id, firstname, lastname, email, phone, address, username, password, create_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userData.user_id,
    userData.firstname,
    userData.lastname,
    userData.email,
    userData.phone,
    userData.address,
    userData.username,
    userData.password,
    userData.create_date
  ];
  console.log(values);
  // Execute the SQL query
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ error: 'Error adding user', sqlError: error.message });
    }
    console.log('User added successfully');
    res.status(200).json({ message: 'User added successfully' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});