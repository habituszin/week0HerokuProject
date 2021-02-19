'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
app.use(express.json());

let conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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

app.post('/', (req, res) => {
  let name = req.query.name;
  let age = Number(req.query.age);
  let color = req.query.color;

  if (!name || !age || !color || age <= 0 ) {
    res.status(400).json({'message': 'check your inputs'})
    return;
  }

  conn.query(`INSERT INTO users (name, age, color) VALUES (?, ?, ?)`, [name, age, color], (err,rows) => {
    if (err) {
      console.log(err);
      res.status(400);
      return;
    }
    res.status(200).json({'message': 'ok'})
  })

})


app.listen(port)