require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',  // Dialecto de MySQL en desarrollo
    port: process.env.DB_PORT || 3306, // Puerto de MySQL
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',  // PostgreSQL en producción
    port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL
    logging: false,  // Desactivar logs en producción
    dialectOptions: {
      ssl: {
        require: true,  // Asegura que se use SSL en PostgreSQL si Render lo requiere
        rejectUnauthorized: false,  // Necesario en algunas configuraciones de Render
      },
    },
  },
};
