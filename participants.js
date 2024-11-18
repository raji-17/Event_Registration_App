const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/participants.db'); 


router.get('/', (req, res) => {
  db.all('SELECT * FROM participants', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/register', (req, res) => {
    console.log('Received data:', req.body); 
  
    const { name, mobile, college, email, event } = req.body;
    const query = `INSERT INTO participants (name, mobile, college, email, event) VALUES (?, ?, ?, ?, ?)`;
  
    if (!name || !mobile || !college || !email || !event) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    db.run(query, [name, mobile, college, email, event], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Registration failed', error: err });
      } else {
        res.json({ message: 'Registration successful!' });
      }
    });
  });
  

module.exports = router;
