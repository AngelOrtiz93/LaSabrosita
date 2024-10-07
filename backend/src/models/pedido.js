// models/pedido.js
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
    values: ['Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado'],
    defaultValue: 'Pendiente'
  },
  total: { // Nuevo campo para el total del pedido
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Pedido',
  tableName: 'Pedidos',
  timestamps: true,
  underscored: true,
});

module.exports = Pedido;
