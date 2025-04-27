import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';



export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const sequelize = new Sequelize(process.env.DB_NAME || 'mydb', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'rootpassword', {
  host: process.env.DB_HOST || 'db',
  dialect: 'mysql', 
});

export default { pool, sequelize };