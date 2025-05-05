import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

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
  Image_url: {
    type: DataTypes.STRING(2083),
    allowNull: true,
    field: 'Image_url',
  },
  Id_category: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_category',
    references: {
      model: 'Event_categories_', 
      key: 'Id_category'          
    }
  },
  Event_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'Event_date',
  },
  Id_calendar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_calendar',
    references: {
      model: 'Calendar_Events_',
      key: 'Id_calendar'
    }
  },
  Is_coming: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'Is_coming',
  }
}, {
  tableName: 'Events_',
  timestamps: false,
});

Event.associate = (models) => {
  // Event.belongsTo(models.EventCategory, {
  //   foreignKey: 'Id_category',
  //   as: 'category',
  // });
  
  Event.belongsTo(models.CalendarEvent, {
    foreignKey: 'Id_calendar',
    as: 'calendar',
  });
};

export default Event;