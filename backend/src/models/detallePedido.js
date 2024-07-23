const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');
const Pedido = require('./pedido');     

const DetallePedido = sequelize.define('DetallePedido', {
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
      model: 'Productos', 
      key: 'id'
    }
  },
  pedidoId: {
    type: DataTypes.UUID,
    references: {
      model: 'pedidos', 
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'DetallePedidos' 
});

module.exports = DetallePedido;
