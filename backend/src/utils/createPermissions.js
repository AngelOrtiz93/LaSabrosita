require('dotenv').config(); // Cargar variables de entorno

const sequelize = require('../config/db'); // Importar instancia de sequelize
const Role = require('../models/Role'); // Importar modelo Role
const Permission = require('../models/permission'); // Importar modelo Permission
const RolePermission = require('../models/rolePermission'); // Importar modelo RolePermission

// Define los roles y sus permisos
const roles = [
  {
    name: 'Administrador',
    description: 'Rol con todos los permisos',
    permissions: [] // Se llenará con todos los permisos
  },
  {
    name: 'Cliente',
    description: 'Rol para clientes con permisos específicos',
    permissions: [
      'Crear Cliente',
      'Obtener Todos los Clientes',
      'Obtener Cliente por ID',
      'Actualizar Cliente',
      'Eliminar Cliente'
    ]
  },
  {
    name: 'Empleado',
    description: 'Rol para empleados con permisos específicos',
    permissions: [
      'Crear Empleado',
      'Obtener Todos los Empleados',
      'Obtener Empleado por ID',
      'Actualizar Empleado',
      'Eliminar Empleado',
      'Contar Pedidos Completados por Empleado'
    ]
  },
  {
    name: 'Domiciliario',
    description: 'Rol para domiciliarios con permisos específicos',
    permissions: [
      'Crear Domiciliario',
      'Obtener Todos los Domiciliarios',
      'Obtener Domiciliario por ID',
      'Actualizar Domiciliario',
      'Eliminar Domiciliario',
      'Contar Pedidos Completados por Domiciliario',
      'Obtener Pedidos Asignados a Domiciliario'
    ]
  }
];

const createRolesAndAssignPermissions = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    // Obtener todos los permisos
    const allPermissions = await Permission.findAll();
    const permissionMap = allPermissions.reduce((map, perm) => {
      map[perm.name] = perm.id;
      return map;
    }, {});

    // Crear roles
    for (const role of roles) {
      const createdRole = await Role.create({ name: role.name, description: role.description });
      console.log(`Rol creado: ${role.name}`);

      // Obtener IDs de permisos para el rol
      const permissionIds = role.permissions.map(permissionName => permissionMap[permissionName]);

      // Asignar permisos al rol
      const rolePermissions = permissionIds.map(permissionId => ({
        roleId: createdRole.id,
        permissionId
      }));

      await RolePermission.bulkCreate(rolePermissions);
      console.log(`Permisos asignados al rol: ${role.name}`);
    }

    // Asignar todos los permisos al rol Administrador
    const allPermissionIds = allPermissions.map(perm => perm.id);
    const adminRole = await Role.findOne({ where: { name: 'Administrador' } });
    const adminRolePermissions = allPermissionIds.map(permissionId => ({
      roleId: adminRole.id,
      permissionId
    }));

    await RolePermission.bulkCreate(adminRolePermissions);
    console.log('Permisos asignados al rol Administrador');

    console.log('Todos los roles han sido creados y asignados con permisos exitosamente.');
  } catch (error) {
    console.error('Error al crear roles y asignar permisos:', error);
  } finally {
    await sequelize.close();
  }
};

createRolesAndAssignPermissions();
