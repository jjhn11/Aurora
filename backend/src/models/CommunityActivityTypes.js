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
  Id_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_category'
  },

  Type_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    field: 'Type_name'
  },
 
}, {
  tableName: 'Community_activity_types_',
  timestamps: false
});
CommunityActivityType.associate = (models) => {
CommunityActivityType.belongsTo(models.CommunityCategory, {
  foreignKey: 'Id_category',
  as: 'category',
});
};
export default CommunityActivityType;