const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const EventCategory = require('./EventCategories'); // Importar el modelo EventCategory
const EventType = require('./EventTypes'); // Importar el modelo EventType

const Event = sequelize.define('Event', {
  Id_event: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_event'
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'Title'
  },
  Description: {
    type: DataTypes.TEXT,
    field: 'Description'
  },
  Id_Event_Category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_Event_Category',
    references: {
      model: 'EventCategory', // Nombre de la tabla referenciada
      key: 'Id_category'
    }
  },
  Id_Event_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_Event_type',
    references: {
      model: 'EventType', // Nombre de la tabla referenciada
      key: 'Id_type'
    }
  },
  Event_date: {
    type: DataTypes.DATE,
    field: 'Event_date'
  },
  Start_time: {
    type: DataTypes.TIME,
    field: 'Start_time'
  },
  End_time: {
    type: DataTypes.TIME,
    field: 'End_time'
  },
  Location: {
    type: DataTypes.STRING(150),
    field: 'Location'
  }
}, {
  tableName: 'Events_',
  timestamps: false
});

// Definir las relaciones
Event.belongsTo(EventCategory, {
  foreignKey: 'Id_Event_Category',
  targetKey: 'Id_category'
});

Event.belongsTo(EventType, {
  foreignKey: 'Id_Event_type',
  targetKey: 'Id_type'
});

module.exports = Event;
