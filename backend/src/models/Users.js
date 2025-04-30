import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const User = sequelize.define('User', {
  Id_user: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    field: 'Id_user',
  },
  Id_occupation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_Occupation',
  },
  Control_num: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: true,
    field: 'Control_num',
  },
  Name_user: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'Name_user',
  },
  Last_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'Last_name',
  },
  Email: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: true,
    field: 'Email',
  },
  Id_gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_gender',
  },
  Id_user_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_user_status',
  },
}, {
  tableName: 'Users_',
  timestamps: false,
});

User.associate = (models) => {
  User.belongsTo(models.Occupation, {
    foreignKey: 'Id_occupation',
    as: 'occupation',
  });
  User.belongsTo(models.Gender, {
    foreignKey: 'Id_gender',
    as: 'gender',
  });
  User.belongsTo(models.UserStatus, {
    foreignKey: 'Id_user_status',
    as: 'userStatus',
  });
};

export default User;