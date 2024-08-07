'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');  // Importar la función uuidv4
const { QueryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si el usuario ya existe
    const existingUser = await queryInterface.rawSelect('Usuarios', {
      where: { email: 'admin@example.com' }
    }, ['email']);

    // Si no existe, crear el usuario y asignar el rol de administrador
    if (!existingUser) {
      const userId = uuidv4();  // Genera un UUID para el nuevo registro

      await queryInterface.bulkInsert('Usuarios', [{
        id: userId,
        nombre: 'Admin',
        apellido: 'Uno',
        email: 'admin@example.com',
        contraseña: bcrypt.hashSync('admin123', 10),
        telefono: '3022010809',
        direccion: 'Cr 2 # 3 - 24',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);

      // Asignar el rol de administrador
      const adminRoleId = '975cc6db-27b1-48ef-9cd1-8a61401766a2';  // ID del rol de administrador
      await queryInterface.bulkInsert('UserRoles', [{
        userId: userId,
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar el usuario y la asignación de rol en caso de que la migración se revierta
    const userId = await queryInterface.rawSelect('Usuarios', {
      where: { email: 'admin@example.com' }
    }, ['id']);

    if (userId) {
      await queryInterface.bulkDelete('UserRoles', { userId: userId });
      await queryInterface.bulkDelete('Usuarios', { id: userId });
    }
  }
};
