import fs from 'fs';
import mysql from 'mysql2/promise';
import path from 'path';
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
  logging: false, // Set to true to see SQL queries in the console
});

export async function executeSqlFile(filePath) {
  try {
    console.log(`Executing SQL file: ${filePath}`);

    // Leer el archivo SQL
    const sqlQueries = fs.readFileSync(path.resolve(filePath), 'utf8');

    // Dividir el archivo en consultas individuales
    const queries = sqlQueries.split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    // Ejecutar cada consulta
    for (const query of queries) {
      try {
        await sequelize.query(query, { raw: true });
      } catch (err) {
        console.error(`Error executing query: ${query}`);
        throw err;
      }
    }

    console.log(`Successfully executed SQL file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error executing SQL file ${filePath}:`, error);
    throw error;
  }
}

export default { pool, sequelize, executeSqlFile};