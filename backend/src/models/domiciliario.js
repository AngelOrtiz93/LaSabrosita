const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Domiciliario extends Model {}

Domiciliario.init({
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
    unique: true,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  fechaContratacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Domiciliario',
  timestamps: false,
});

module.exports = Domiciliario;