const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');



const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const sequelize = new Sequelize(process.env.DB_NAME || 'mydb', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'rootpassword', {
  host: process.env.DB_HOST || 'db',
  dialect: 'mysql', 
});

module.exports = { pool, sequelize };