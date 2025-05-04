import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const CommunityActivityLocation = sequelize.define('CommunityActivityLocation', {
  Id_Location: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Location'
  },
  Location_: {
    type: DataTypes.STRING(50),
    field: 'Location_'
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
  tableName: 'Community_activity_location_',
  timestamps: false,
});

CommunityActivityLocation.associate = (models) => {
  CommunityActivityLocation.belongsTo(models.CommunityCategory, {
    foreignKey: 'Id_category',
    as: 'category'
  });
  CommunityActivityLocation.hasMany(models.CommunityActivity, {
    foreignKey: 'Id_Location',
    as: 'activities'
  });
};

export default CommunityActivityLocation;
