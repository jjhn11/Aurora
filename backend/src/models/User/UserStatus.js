import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const UserStatus = sequelize.define('UserStatus', {
  Id_user_status: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_user_status',
  },
  User_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'User_status',
  },
}, {
  tableName: 'User_status_',
  timestamps: false,
});

UserStatus.associate = (models) => {
  UserStatus.hasMany(models.User, {
    foreignKey: 'Id_user_status',
    as: 'users'
  });
};

export default UserStatus;
