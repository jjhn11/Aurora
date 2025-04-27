import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Country = sequelize.define('Country', {
  Id_country: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_country'
  },
  Country_name: {
    type: DataTypes.STRING(50),
    field: 'Country_name'
  }
}, {
  tableName: 'Countries_',
  timestamps: false
});

export default Country;
