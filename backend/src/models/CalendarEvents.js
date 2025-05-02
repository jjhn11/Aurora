import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const CalendarEvent = sequelize.define('CalendarEvent', {
  Id_calendar: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_calendar',
  },
  Start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Start_date',
  },
  End_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'End_date',
  },
}, {
  tableName: 'Calendar_Events_',
  timestamps: false,
});

CalendarEvent.associate = (models) => {
  CalendarEvent.hasMany(models.Event, {
    foreignKey: 'Id_calendar',
    as: 'events'
  });
};

export default CalendarEvent;