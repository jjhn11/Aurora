const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const CommunityEventAttendance = sequelize.define('CommunityEventAttendance', {
  Id_attendance_co: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_attendance_co'
  },
  Attendance_name: {
    type: DataTypes.STRING(15),
    field: 'Attendance_name'
  }
}, {
  tableName: 'Community_event_attendance_',
  timestamps: false
});

module.exports = CommunityEventAttendance;
