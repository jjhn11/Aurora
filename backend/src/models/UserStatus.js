const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const UserStatus = sequelize.define('UserStatus', {
  Id_user_status: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_user_status'
  },
  User_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    field: 'User_status'
  }
}, {
  tableName: 'User_status_',
  timestamps: false
});

module.exports = UserStatus;
