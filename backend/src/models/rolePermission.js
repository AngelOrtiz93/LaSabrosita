const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class RolePermission extends Model {}

RolePermission.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: 'Roles',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  permissionId: {
    type: DataTypes.UUID,
    references: {
      model: 'Permissions',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'RolePermission',
  tableName: 'RolePermissions',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['roleId', 'permissionId'],
    },
  ],
});

module.exports = RolePermission;
