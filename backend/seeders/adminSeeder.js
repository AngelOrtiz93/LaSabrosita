const bcrypt = require('bcrypt'); // Si estás usando bcrypt
const { Role } = require('../src/models/Role');
const { Usuario } = require('../src/models/usuario');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verifica si el rol 'admin' existe, si no, créalo
    const [adminRole, created] = await Role.findOrCreate({
      where: { nombre: 'admin' },
      defaults: { descripcion: 'Administrador con todos los permisos' },
    });

    // Crea el usuario administrador
    const adminPassword = await bcrypt.hash('admin123', 10); // Cambia 'admin123' por una contraseña segura
    await Usuario.findOrCreate({
      where: { email: 'admin@restaurante.com' },
      defaults: {
        nombre: 'Administrador',
        email: 'admin@restaurante.com',
        contraseña: adminPassword,
        rol: adminRole.id, // Asegúrate de que este campo corresponda con tus modelos y lógica
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina el usuario administrador
    await Usuario.destroy({
      where: { email: 'admin@restaurante.com' },
    });

    // Opcional: Elimina el rol 'admin' si ya no es necesario
    await Role.destroy({
      where: { nombre: 'admin' },
    });
  },
};
