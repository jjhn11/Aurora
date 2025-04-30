import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const CommunityActivityAttendance = sequelize.define('CommunityActivityAttendance', {
  Id_attendance: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Id_user: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  Id_activity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Confirmation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  Timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Community_activity_attendance_',
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

export default CommunityEventAttendance;
