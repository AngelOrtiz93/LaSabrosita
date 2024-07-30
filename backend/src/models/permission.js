const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Permission extends Model {}

Permission.init({
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
    type: DataTypes.STRING, // Campo de descripción añadido
    allowNull: true,       // Puede ser null
  },
}, {
  sequelize,
  modelName: 'Permission',
  tableName: 'Permissions',
  timestamps: false,
});

module.exports = Permission;
