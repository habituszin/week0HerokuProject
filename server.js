'use strict';

const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
app.use(express.json());

let conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'persons',
});

conn.connect((err) => {
  if (err) {
    console.error('Cannot connect to the database', err);
    return;
  }
  console.log('Connection established');
});

app.get('/', (req, res) => {
  conn.query(`SELECT * FROM users;`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400);
      return;
    }
    res.status(200).json(rows)
  })
})

app.post('/add', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let color = color;

  conn.query(`INSERT INTO users VALUES (?, ?, ?)`, [name, age, color], (err,rows) => {
    if (err) {
      console.log(err);
      res.status(400);
      return;
    }
    res.status(200).json({'message': 'ok'})
  })

})


app.listen(port)