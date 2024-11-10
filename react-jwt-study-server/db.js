const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database(':memory:'); // 메모리 데이터베이스 사용 (테스트 용도)
const path = require('path');

const dbPath = path.resolve(__dirname, 'data', 'mydatabase.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      age INTEGER
    )
  `);
});

module.exports = db;
