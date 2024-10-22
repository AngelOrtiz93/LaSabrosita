require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'restaurante_k32a_user',  // Cambia 'tu_usuario' si no usas variables de entorno
    password: process.env.DB_PASSWORD || 'wIe8VYt3uXPHlm5Xz0dtsOjfA9mFXOLh',  // Cambia 'tu_contraseña' si no usas variables de entorno
    database: process.env.DB_NAME || 'restaurante',  // Cambia 'nombre_base_datos' si no usas variables de entorno
    host: process.env.DB_HOST || 'dpg-csbuanbv2p9s738pqou0-a',  // Cambia 'tu_host_render' si no usas variables de entorno
    dialect: 'mysql'||'postgres',  // Dialecto para PostgreSQL
    port: process.env.DB_PORT || 5432,  // Cambia el puerto si es diferente
  },
};

