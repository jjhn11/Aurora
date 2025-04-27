import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Career = sequelize.define('Career', {
  Id_career: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_career'
  },
  Career_name: {
    type: DataTypes.STRING(40),
    field: 'Career_name'
  }
}, {
  tableName: 'Careers_',
  timestamps: false
});

export default Career;
