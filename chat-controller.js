const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE chat_history (id INT, user TEXT, message TEXT)");
  db.run("INSERT INTO chat_history (id, user, message) VALUES (1, 'user1', 'Hello world')");
});

function searchChatHistory(searchTerm) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM chat_history WHERE message LIKE '%${searchTerm}%'`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

module.exports = { searchChatHistory };
