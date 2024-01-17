const Sequelize = require('sequelize');

require('dotenv').congifg();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    dialect: 'mysql', 
    host: 'localhost',
    port: 8889,
  });

module.exports = sequelize;