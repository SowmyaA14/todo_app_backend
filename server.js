const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const urlDB = `mysql://root:lDMJbxNAZJZSAFwoGKKKdkIESScNmRlM@mysql.railway.internal:3306/railway`;

const db = mysql.createConnection(urlDB);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL Database.');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.sendStatus(201);
    }
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
