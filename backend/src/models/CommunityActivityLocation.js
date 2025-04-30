import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Community = sequelize.define('CommunityActivityLocation', {
  Id_Location: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Location_: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'Community_activity_location_',
  timestamps: false,
});

export default Community;
