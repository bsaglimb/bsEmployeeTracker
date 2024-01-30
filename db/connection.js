// db/connection.js
const mysql = require('mysql2');

// Create a connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'company_db'
});

// Export the pool
module.exports = connection;
