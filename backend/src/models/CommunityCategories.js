import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const CommunityCategory = sequelize.define('CommunityCategory', {
  Id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_category'
  },
  Id_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  CommunityCategory.belongsTo(models.CommunityActivityType, {
    foreignKey: 'Id_type',
    as: 'type',
  });
};
export default CommunityCategory;