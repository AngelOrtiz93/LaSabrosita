// src/models/pedido.js

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
      model: 'Clientes', // Nombre de la tabla en la base de datos
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  empleadoId: {
    type: DataTypes.UUID,
    references: {
      model: 'Empleados', // Nombre de la tabla en la base de datos
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  domiciliarioId: {
    type: DataTypes.UUID,
    references: {
      model: 'Domiciliarios', // Nombre de la tabla en la base de datos
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
  estado: { // Añade este campo si aún no está en el modelo
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending' // Valor por defecto
  }
}, {
  sequelize,
  modelName: 'pedidos',
  timestamps: true,
  underscored: true
});

module.exports = Pedido;
