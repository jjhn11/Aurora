import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Gender = sequelize.define('Gender', {
  Id_gender: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_gender',
  },
  Gender_name: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'Gender_name',
  },
}, {
  tableName: 'Genders_',
  timestamps: false,
});
export default Career;
