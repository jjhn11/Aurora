const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Users');
const Event = require('./Events'); 


const Community = sequelize.define('Community', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'title'
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'User',  
          key: 'idAOuth'
        }
      },
      Event_date: {
        type: DataTypes.DATE,
        field: 'Event_date',
        references: {
          model: 'Event', 
          key: 'Event_date'
        }
      },
      Start_time: {
        type: DataTypes.TIME,
        field: 'Start_time',
        references: {
          model: 'Event', 
          key: 'Start_time'
        }
      },
      End_time: {
        type: DataTypes.TIME,
        field: 'End_time',
        references: {
          model: 'Event', 
          key: 'End_time'
        }
      },
      Location: {
        type: DataTypes.STRING(150),
        field: 'Location',
        references: {
          model: 'Event', 
          key: 'Location'
        }
      },
      Id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'Id_category',
        references: {
          model: 'EventCategory', 
          key: 'Id_category'
        }
      },
    }, {
    timestamps: false


});

module.exports = Community;