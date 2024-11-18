const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/participants.db');

db.run(`
  CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    college TEXT NOT NULL,
    email TEXT NOT NULL,
    event TEXT NOT NULL
  )
`);

module.exports = db;
