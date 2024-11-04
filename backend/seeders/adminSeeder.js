//seeders/adminSeeder.js

const bcrypt = require('bcrypt');
const Role = require('../src/models/Role');
const Usuario = require('../src/models/usuario');
const UserRoles = require('../src/models/UserRole'); // Asegúrate de importar los modelos correctamente

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Verifica si el rol 'Administrador' existe, si no, créalo
      const [adminRole, created] = await Role.findOrCreate({
        where: { name: 'Administrador' },
        defaults: { description: 'Rol con todos los permisos.' },
      });

      // Crea el usuario administrador
      const adminPassword = await bcrypt.hash('admin123', 10);
      const [adminUser, userCreated] = await Usuario.findOrCreate({
        where: { email: 'admin@restaurante.com' },
        defaults: {
          nombre: 'Administrador',
          apellido: 'Principal',
          email: 'admin@restaurante.com',
          contraseña: adminPassword,
          // Incluye otros campos obligatorios aquí si existen
        },
      });

      // Crear la relación en UserRoles
      await UserRoles.findOrCreate({
        where: {
          userId: adminUser.id, // La ID del usuario
          roleId: adminRole.id, // La ID del rol Administrador
        },
        defaults: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log('Usuario administrador y relación creada en UserRoles.');
    } catch (error) {
      console.error('Error al crear el administrador y la relación en UserRoles:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Elimina la relación en UserRoles
      const adminUser = await Usuario.findOne({ where: { email: 'admin@restaurante.com' } });
      const adminRole = await Role.findOne({ where: { name: 'Administrador' } });

      if (adminUser && adminRole) {
        await UserRoles.destroy({
          where: { userId: adminUser.id, roleId: adminRole.id },
        });
      }

      // Elimina el usuario administrador
      await Usuario.destroy({
        where: { email: 'admin@restaurante.com' },
      });

      // Opcional: Elimina el rol 'Administrador' si ya no es necesario
      await Role.destroy({
        where: { name: 'Administrador' },
      });

      console.log('Usuario administrador y relación eliminada en UserRoles.');
    } catch (error) {
      console.error('Error al eliminar el administrador y la relación en UserRoles:', error);
    }
  },
};
