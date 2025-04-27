import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 
import CommunityCategory from './CommunityCategories.js';

const CommunityActivityType = sequelize.define('CommunityActivityType', {
  Id_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_type'
  },
  Type_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Type_name'
  },
  Id_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_category',
    references: {
      model: 'Community_categories_',
      key: 'Id_category'
    }
  }
}, {
  tableName: 'Community_activity_types_',
  timestamps: false
});

// Define relationship
CommunityActivityType.belongsTo(CommunityCategory, {
  foreignKey: 'Id_category',
  targetKey: 'Id_category'
});

export default CommunityActivityType;