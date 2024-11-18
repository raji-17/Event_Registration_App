const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/participants.db'); 

db.all("SELECT * FROM participants", [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log("Participants:", rows);  
  db.close();
});
