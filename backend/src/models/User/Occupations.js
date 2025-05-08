import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db.js'; 

const Occupation = sequelize.define('Occupation', {
  Id_occupation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_occupation',
  },
  Occupation: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'Occupation',
  },
}, {
  tableName: 'Occupations_',
  timestamps: false,
});

Occupation.associate = (models) => {
  Occupation.hasMany(models.User, {
    foreignKey: 'Id_occupation',
    as: 'users'
  });
};

export default Occupation;