require('dotenv').config();

const env = process.env.NODE_ENV || 'development'; // Por defecto 'development'

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  },
  production: {
    username: 'admin',  // Usuario de la base de datos
    password: 'AvQRYUDVNRJxqkPEyxs6bYHSkPi7HtSs',  // Contraseña de la base de datos
    database: 'testdb_yyij',  // Nombre de la base de datos
    host: 'dpg-csd9ifrqf0us73b21fog-a',  // Host de la base de datos
    dialect: 'postgres',  // Asegúrate de que esté configurado a 'postgres'
    port: 5432,  // Puerto por defecto de PostgreSQL
  },
};

module.exports = config[env];  // Exporta solo la configuración para el entorno actual
