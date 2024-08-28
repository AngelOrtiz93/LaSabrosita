const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect, // Usando el dialecto de la configuración
    dialectOptions: {
      charset: 'utf8mb4', // Configura el charset para la conexión
    },
    define: {
      charset: 'utf8mb4', // Configura el charset por defecto para los modelos
      collate: 'utf8mb4_unicode_ci', // Configura la collation por defecto
    },
  }
);

module.exports = sequelize;
