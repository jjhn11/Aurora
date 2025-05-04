import dotenv from 'dotenv';
import { executeSqlFile, sequelize } from '../config/db.js';

dotenv.config();

async function loadSampleData() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    await executeSqlFile('src/data/sample_data.sql');
    console.log('Sample data loaded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error loading sample data:', error);
    process.exit(1);
  }
}

loadSampleData();