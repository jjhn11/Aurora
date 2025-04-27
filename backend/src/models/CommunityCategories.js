import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const CommunityCategory = sequelize.define('CommunityCategory', {
  Id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_category'
  },
  Category_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'Category_name'
  }
}, {
  tableName: 'Community_categories_',
  timestamps: false
});

export default CommunityCategory;