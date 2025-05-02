import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';



const CommunityActivity = sequelize.define('CommunityActivity', {
  Id_activity: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_activity'
  },
  Title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'Title'
  },
  Description: {
    type: DataTypes.TEXT,
    field: 'Description'
  },
  Id_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_type'
  },
  Id_Location: {
    type: DataTypes.INTEGER,
    allowNull: false,},

  Start_time: {
    type: DataTypes.TIME,
    field: 'Start_time'
  },
  End_time: {
    type: DataTypes.TIME,
    field: 'End_time'
  },
  Event_date: {
    type: DataTypes.DATE,
    field: 'Event_date'
  },
  
  Organizer_id: {
    type: DataTypes.STRING(8),
    field: 'Organizer_id',
    references: {
      model: 'Users_',
      key: 'Id_user'
    }
  }
}, {
  tableName: 'Community_activities_',
  timestamps: false
});

CommunityActivity.associate = (models) => {
CommunityActivity.belongsTo(models.CommunityActivityTypes, {
  foreignKey: 'Id_types',
  as: 'Types',
});
CommunityActivity.belongsTo(models.User, {
  foreignKey: 'Organizer_id',
  as: 'organizer',
});
CommunityActivity.belongsTo(models.CommunityActivityLocation, {
  foreignKey: 'Id_Location',
  as: 'location',
});
};
export default CommunityActivity;
