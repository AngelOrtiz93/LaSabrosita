const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Pedido extends Model {}

Pedido.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clienteId: {
    type: DataTypes.UUID,
    references: {
      model: 'Clientes',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  empleadoId: {
    type: DataTypes.UUID,
    references: {
      model: 'Empleados',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  domiciliarioId: {
    type: DataTypes.UUID,
    references: {
      model: 'Domiciliarios',
      key: 'id'
    },
    onDelete: 'SET NULL',
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
