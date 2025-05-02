import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CommunityActivityAttendance = sequelize.define('CommunityActivityAttendance', {
  Id_attendance: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_attendance'
  },
  Id_user: {
    type: DataTypes.STRING(8),
    allowNull: false,
    field: 'Id_user',
    references: {
      model: 'Users_',
      key: 'Id_user'
    }
  },
  Id_activity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_activity',
    references: {
      model: 'Community_activities_',
      key: 'Id_activity'
    }
  },
  Confirmation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'Confirmation'
  },
  Timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'Timestamp'
  },
}, {
  tableName: 'Community_event_attendance_',
  timestamps: false,
});

CommunityActivityAttendance.associate = (models) => {
  CommunityActivityAttendance.belongsTo(models.User, {
    foreignKey: 'Id_user',
    as: 'user',
  });
  CommunityActivityAttendance.belongsTo(models.CommunityActivity, {
    foreignKey: 'Id_activity',
    as: 'activity',
  });
};

console.log('CommunityActivityAttendance model registered:', CommunityActivityAttendance === sequelize.models.CommunityActivityAttendance);

export default CommunityActivityAttendance;