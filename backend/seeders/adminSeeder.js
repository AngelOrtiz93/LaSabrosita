'use strict';
const bcrypt = require('bcrypt');
const { QueryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si el usuario ya existe
    const existingUser = await queryInterface.rawSelect('Empleados', {
      where: { email: 'admin@example.com' }
    }, ['email']);

    // Si no existe, crear el usuario
    if (!existingUser) {
      await queryInterface.bulkInsert('Empleados', [{
        id: Sequelize.UUIDV4(),  // Genera un UUID para el nuevo registro
        nombre: 'Admin',
        apellido: 'Uno',
        email: 'admin@example.com',
        contraseña: bcrypt.hashSync('admin123', 10),
        telefono: '3022010809',
        direccion: 'Cr 2 # 3 - 24',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el usuario en caso de que la migración se revierta
    await queryInterface.bulkDelete('Empleados', { email: 'admin@example.com' });
  }
};
