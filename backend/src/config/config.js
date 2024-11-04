// src/config/index.js
const config = {
  development: {
    database: process.env.DB_NAME || 'testdb',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '1234',
    host: process.env.DB_HOST || 'mysql',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    dialectOptions: {},
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;