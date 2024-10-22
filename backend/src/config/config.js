require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,  // Cambia si no usas variables de entorno
    dialect: 'mysql',  // Especifica el dialecto correcto, en este caso 'mysql'
    port: process.env.DB_PORT || 3306,  // Cambia si usas un puerto diferente para MySQL
  },
  production: {
    username: process.env.DB_USER || 'restaurante_k32a_user',  // Cambia si no usas variables de entorno
    password: process.env.DB_PASSWORD || 'wIe8VYt3uXPHlm5Xz0dtsOjfA9mFXOLh',  // Cambia si no usas variables de entorno
    database: process.env.DB_NAME || 'restaurante',  // Cambia si no usas variables de entorno
    host: process.env.DB_HOST || 'dpg-csbuanbv2p9s738pqou0-a',
    dialect: 'postgres',  // Asegúrate de que esté configurado a 'postgres'
    port: process.env.DB_PORT || 5432, 
  },
};
