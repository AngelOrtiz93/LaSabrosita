require('dotenv').config();

const env = process.env.NODE_ENV || 'development';  // Por defecto 'development'

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',  // MySQL para desarrollo
    port: process.env.DB_PORT || 3306,
  },
  production: {
    username: process.env.DB_USER,  // Obtiene el usuario desde el .env
    password: process.env.DB_PASSWORD,  // Obtiene la contraseña desde el .env
    database: process.env.DB_NAME,  // Obtiene el nombre de la base de datos desde el .env
    host: process.env.DB_HOST,  // Obtiene el host desde el .env
    dialect: 'postgres',  // PostgreSQL para producción
    port: process.env.DB_PORT || 5432,  // Puerto por defecto para PostgreSQL
  },
}[env];  // Exporta la configuración correspondiente
