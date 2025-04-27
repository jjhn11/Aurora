import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Community = sequelize.define('Community', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'id'
  },
  name: {  
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'comunity_name'  
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'description'  
  },
  id_category: {
    type: DataTypes.INTEGER,
    field: 'id_category'
  }
}, {
  tableName: 'Communities',  
  timestamps: false
});

export default Community;
