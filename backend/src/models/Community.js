const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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

module.exports = Community;
