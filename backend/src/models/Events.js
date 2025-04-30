import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 
import EventCategory from'./EventCategories.js'; 
import EventType from './CalendarEvents.js'; 

const Event = sequelize.define('Event', {
  Id_event: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_event',
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'Title',
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'Description',
  },
  Id_category: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_category',
  },
  Event_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'Event_date',
  },
}, {
  tableName: 'Events_',
  timestamps: false,
});

Event.associate = (models) => {
  Event.belongsTo(models.EventCategory, {
    foreignKey: 'Id_category',
    as: 'category',
  });
};

export default Event;