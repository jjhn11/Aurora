const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

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

module.exports = Country;
