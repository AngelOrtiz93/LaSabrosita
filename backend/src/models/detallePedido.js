// src/models/detallePedido.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');
const Pedido = require('./pedido');

class DetallePedido extends Model {}

DetallePedido.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productoId: {
    type: DataTypes.UUID,
    references: {
      model: Producto,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  pedidoId: {
    type: DataTypes.UUID,
    references: {
      model: Pedido,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  sequelize,
  modelName: 'DetallePedido',
  tableName: 'DetallePedidos',
  timestamps: false,
});

module.exports = DetallePedido;
