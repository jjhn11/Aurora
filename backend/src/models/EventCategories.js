const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

const EventCategory = sequelize.define('EventCategory', {
  Id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_category'
  },
  Event_name: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    field: 'Event_name'
  }
}, {
  tableName: 'Event_categories_',
  timestamps: false
});

module.exports = EventCategory;
