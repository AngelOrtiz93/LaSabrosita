// src/index.js o src/models/index.js
const { Sequelize } = require('sequelize');
const config = require('./config');  // Asegúrate de que la ruta sea correcta

// Inicialización de Sequelize usando la configuración del entorno actual
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect, // Usando el dialecto de la configuración
    port: config.port, // Usar el puerto correcto según la configuración
    dialectOptions: {
      charset: 'utf8mb4', // Configura el charset para la conexión
    },
    define: {
      charset: 'utf8mb4', // Configura el charset por defecto para los modelos
      collate: 'utf8mb4_unicode_ci', // Configura la collation por defecto
    },
  }
);

module.exports = sequelize; // Exporta la instancia de Sequelize
