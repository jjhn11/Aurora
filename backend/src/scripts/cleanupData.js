import dotenv from 'dotenv';
import { executeSqlFile, sequelize } from '../config/db.js';

dotenv.config();

async function cleanupData() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    // Confirm with user before proceeding
    console.log('\x1b[33m%s\x1b[0m', 'WARNING: This will delete ALL data from the database.');
    console.log('\x1b[33m%s\x1b[0m', 'Make sure you have a backup if needed.');
    
    // Execute cleanup SQL file
    await executeSqlFile('src/data/cleanup_data.sql');
    console.log('\x1b[32m%s\x1b[0m', 'Database cleaned successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error cleaning database:', error);
    process.exit(1);
  }
}

// Run if called directly (not imported)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  cleanupData();
}

export { cleanupData };