import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 
import EventCategory from './EventCategories.js'; 

const EventType = sequelize.define('EventType', {
  Id_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_type'
  },
  Type_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'Type_name'
  },
  Category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Category_id',
    references: {
      model: 'EventCategory', 
      key: 'Id_category'
    }
  }
}, {
  tableName: 'Event_types_',
  timestamps: false
});

// Definir la relación
EventType.belongsTo(EventCategory, {
  foreignKey: 'Category_id',
  targetKey: 'Id_category'
});

export default EventType;
