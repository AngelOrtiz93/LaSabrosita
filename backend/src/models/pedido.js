const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Pedido extends Model {}

Pedido.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.UUID,
    references: {
      model: 'Usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  fechaPedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  }
}, {
  sequelize,
  modelName: 'Pedido',
  tableName: 'Pedidos',
  timestamps: true,
  underscored: true,
});

module.exports = Pedido;
