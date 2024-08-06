require('dotenv').config(); // Cargar variables de entorno

const sequelize = require('../config/db'); // Importar instancia de sequelize
const Role = require('../models/Role'); // Importar modelo Role
const Permission = require('../models/permission'); // Importar modelo Permission
const RolePermission = require('../models/rolePermission'); // Importar modelo RolePermission

// Define los permisos de usuario
const permissions = [
  { name: 'Obtener Todos los Usuarios', description: 'Permiso para obtener todos los usuarios.' },
  { name: 'Obtener Usuario por ID', description: 'Permiso para obtener un usuario por ID.' },
  { name: 'Crear Usuario', description: 'Permiso para crear un nuevo usuario.' },
  { name: 'Actualizar Usuario', description: 'Permiso para actualizar un usuario existente.' },
  { name: 'Eliminar Usuario', description: 'Permiso para eliminar un usuario.' }
];

const createPermissions = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos.');

    // Crear permisos si no existen
    for (const perm of permissions) {
      await Permission.findOrCreate({
        where: { name: perm.name },
        defaults: perm
      });
    }

    console.log('Permisos de usuario creados exitosamente.');

    // Opcional: Asignar permisos a un rol específico si es necesario
    const [adminRole] = await Role.findOrCreate({
      where: { name: 'Administrador' },
      defaults: { description: 'Rol con todos los permisos' }
    });
    console.log('Rol Administrador encontrado o creado.');

    // Obtener todos los permisos
    const allPermissions = await Permission.findAll();
    const permissionMap = allPermissions.reduce((map, perm) => {
      map[perm.name] = perm.id;
      return map;
    }, {});

    // Asignar permisos al rol Administrador
    const adminRolePermissions = permissions.map(perm => ({
      roleId: adminRole.id,
      permissionId: permissionMap[perm.name]
    }));

    await RolePermission.bulkCreate(adminRolePermissions);
    console.log('Permisos asignados al rol Administrador.');

  } catch (error) {
    console.error('Error creando permisos o asignando a roles:', error);
  } finally {
    await sequelize.close();
  }
};

createPermissions();
