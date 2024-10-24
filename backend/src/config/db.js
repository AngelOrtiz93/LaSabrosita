const { Sequelize } = require('sequelize');
const config = require('./config');

// Detecta el entorno (por defecto 'development')
const environment = process.env.NODE_ENV || 'development'; 
const configEnv = config[environment]; 

const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  {
    host: configEnv.host,
    dialect: configEnv.dialect,
    port: configEnv.port,
    dialectOptions: configEnv.dialectOptions || {},  // Configuraciones adicionales como SSL en producción
    logging: environment === 'development',  // Solo activar logs en desarrollo
  }
);

module.exports = sequelize;
