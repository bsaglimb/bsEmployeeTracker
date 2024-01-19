const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'company_db',
  port: 8889,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool
module.exports = pool;





// // Import and require mysql2
// const mysql = require('mysql2');

// //Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // TODO: Add MySQL password here
//     password: 'root',
//     database: 'company_db',
//     port: 8889
//   },
//   console.log(`Connected to the company_db database.`)
// );


// module.exports = db;







// const Sequelize = require('sequelize');

// require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//     dialect: 'mysql', 
//     host: 'localhost',
//     port: 8889,
//   });

// module.exports = sequelize;