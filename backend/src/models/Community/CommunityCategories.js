import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const CommunityCategory = sequelize.define('CommunityCategory', {
  Id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_category'
  },

  Category_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    field: 'Category_name'
  }
}, {
  tableName: 'Community_categories_',
  timestamps: false
});

CommunityCategory.associate = (models) => {
  CommunityCategory.hasMany(models.CommunityActivityType, {
    foreignKey: 'Id_category',
    as: 'activityTypes'
  });
  
  CommunityCategory.hasMany(models.CommunityActivityLocation, {
    foreignKey: 'Id_category',
    as: 'locations'
  });
};

export default CommunityCategory;