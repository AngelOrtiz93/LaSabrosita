const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, 
    allowNull: true,      
  },
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'Roles',
  timestamps: false,
});

module.exports = Role;
