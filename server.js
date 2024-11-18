const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); 
const db = require('./database/database.js');

const participantsRoute = require('./routes/participants');

app.post('/register', (req, res) => {
  const participant = req.body;
  if (!participant.name || !participant.mobile || !participant.college || !participant.email || !participant.event) {
    return res.status(400).json({ message: 'All fields are required!' });
  }
  db.run(
    `INSERT INTO participants (name, mobile, college, email, event) VALUES (?, ?, ?, ?, ?)`,
    [participant.name, participant.mobile, participant.college, participant.email, participant.event],
    function (err) {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ message: 'Failed to register participant.' });
      }
      res.json({ message: 'Registration successful!' });
    }
  );
});

app.use('/participants', participantsRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
