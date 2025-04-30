import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 
import EventCategory from './EventCategories.js'; 

const CalendarEvent = sequelize.define('CalendarEvent', {
  Id_calendar: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_calendar',
  },
  Event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Event_id',
  },
  Calendar_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Calendar_date',
  },
  Start_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'Start_date',
  },
  End_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'End_date',
  },
  Notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'Notes',
  },
}, {
  tableName: 'Calendar_Events_',
  timestamps: false,
});

CalendarEvent.associate = (models) => {
  CalendarEvent.belongsTo(models.Event, {
    foreignKey: 'Event_id',
    as: 'event',
  });
};

export default CalendarEvent;