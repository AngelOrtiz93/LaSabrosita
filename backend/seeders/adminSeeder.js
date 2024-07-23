const bcrypt = require('bcrypt');
const Empleado = require('../src/models/empleado'); // Asegúrate de que esta ruta es correcta

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Empleado.create({
      nombre: 'Admin',
      apellido: 'uno',
      email: 'admin@example.com',
      contraseña: bcrypt.hashSync('admin123', 10),
      telefono: '3022010809',
      direccion: 'Cr 2 # 3 -  24'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Empleado.destroy({ where: { email: 'admin@example.com' } });
  }
};
