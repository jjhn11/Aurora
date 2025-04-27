import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

// Definición del modelo User
const User = sequelize.define('User', {
  Id_user: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    field: 'Id_user'
  },
  Id_career: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_career',
    references: {
      model: 'Career', 
      key: 'Id_career'
    }
  },
  Control_num: {
    type: DataTypes.STRING(11),
    unique: true,
    field: 'Control_num'
  },
  Name_user: {
    type: DataTypes.STRING(50),
    field: 'Name_user'
  },
  Last_name: {
    type: DataTypes.STRING(50),
    field: 'Last_name'
  },
  Email: {
    type: DataTypes.STRING(64),
    unique: true,
    field: 'Email'
  },
  Id_gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_gender'
  },
  Password: {
    type: DataTypes.STRING(18),
    field: 'Password'
  },
  Id_country: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_country',
    references: {
      model: 'Country',
      key: 'Id_country'
    }
  },
  Id_user_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'Id_user_status',
    references: {
      model: 'UserStatus',
      key: 'Id_user_status'
    }
  },
  Id_attendance_co: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'Id_attendance_co',
    references: {
      model: 'CommunityEventAttendance',
      key: 'Id_attendance_co'
    }
  }
}, {
  tableName: 'Users_', 
  timestamps: false
});

export default User;
