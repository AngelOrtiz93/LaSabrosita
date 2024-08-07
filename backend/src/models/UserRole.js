// models/UserRole.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserRole extends Model {}

UserRole.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: 'Roles',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'UserRole',
  tableName: 'UserRoles',
  timestamps: false
});

module.exports = UserRole;
