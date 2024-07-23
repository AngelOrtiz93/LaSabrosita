// src/models/cliente.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajusta la ruta según tu configuración

class Cliente extends Model {}

Cliente.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // Asegúrate de que esta propiedad esté configurada
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Cliente',
});

module.exports = Cliente;
