import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db.js'; 

const EventCategory = sequelize.define('EventCategory', {
  Id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_category',
  },
  Type_event: {
    type: DataTypes.STRING(40),
    allowNull: true,
    field: 'Type_event',
  },
  Event_name: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    field: 'Event_name',
  },
}, {
  tableName: 'Event_categories_',
  timestamps: false,
});

EventCategory.associate = (models) => {
  EventCategory.hasMany(models.Event, {
    foreignKey: 'Id_category',
    as: 'events',
  });
};

export default EventCategory;