const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommunityActivity = sequelize.define('CommunityActivity', {
  Id_activity: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_activity'
  },
  Title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'Title'
  },
  Description: {
    type: DataTypes.TEXT,
    field: 'Description'
  },
  Id_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_type',
    references: {
      model: 'Community_activity_types_',
      key: 'Id_type'
    }
  },
  Location: {
    type: DataTypes.STRING(150),
    field: 'Location'
  },
  Start_time: {
    type: DataTypes.TIME,
    field: 'Start_time'
  },
  End_time: {
    type: DataTypes.TIME,
    field: 'End_time'
  },
  Event_date: {
    type: DataTypes.DATE,
    field: 'Event_date'
  },
  Status: {
    type: DataTypes.ENUM('Activo', 'Finalizado', 'Cancelado'),
    defaultValue: 'Activo',
    field: 'Status'
  },
  Organizer_id: {
    type: DataTypes.STRING(8),
    field: 'Organizer_id',
    references: {
      model: 'Users_',
      key: 'Id_user'
    }
  }
}, {
  tableName: 'Community_activities_',
  timestamps: false
});

module.exports = CommunityActivity;