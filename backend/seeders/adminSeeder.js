// src/migrations/add-imagen-url-to-usuarios.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'imagenUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'imagenUrl');
  }
};
