require('dotenv').config(); // Cargar variables de entorno

const sequelize = require('../config/db'); // Importar instancia de sequelize
const Role = require('../models/Role'); // Importar modelo Role
const Permission = require('../models/permission'); // Importar modelo Permission
const RolePermission = require('../models/rolePermission'); // Importar modelo RolePermission

// Define los permisos de usuario
const permissions = [
  // Permisos de clientes
  { name: 'Obtener Todos los Clientes', description: 'Permiso para obtener todos los clientes.' },
  { name: 'Obtener Cliente por ID', description: 'Permiso para obtener un cliente por ID.' },
  { name: 'Crear Cliente', description: 'Permiso para crear un nuevo cliente.' },
  { name: 'Actualizar Cliente', description: 'Permiso para actualizar un cliente existente.' },
  { name: 'Eliminar Cliente', description: 'Permiso para eliminar un cliente.' },
  
  // Permisos de detalle de pedidos
  { name: 'Obtener Todos los Detalles de Pedido', description: 'Permiso para obtener todos los detalles de pedidos.' },
  { name: 'Obtener Detalle de Pedido por ID', description: 'Permiso para obtener un detalle de pedido por ID.' },
  { name: 'Crear Detalle de Pedido', description: 'Permiso para crear un nuevo detalle de pedido.' },
  { name: 'Actualizar Detalle de Pedido', description: 'Permiso para actualizar un detalle de pedido existente.' },
  { name: 'Eliminar Detalle de Pedido', description: 'Permiso para eliminar un detalle de pedido.' },

  // Permisos de domiciliarios
  { name: 'Obtener Todos los Domiciliarios', description: 'Permiso para obtener todos los domiciliarios.' },
  { name: 'Obtener Domiciliario por ID', description: 'Permiso para obtener un domiciliario por ID.' },
  { name: 'Crear Domiciliario', description: 'Permiso para crear un nuevo domiciliario.' },
  { name: 'Actualizar Domiciliario', description: 'Permiso para actualizar un domiciliario existente.' },
  { name: 'Eliminar Domiciliario', description: 'Permiso para eliminar un domiciliario.' },

  // Permisos de empleados
  { name: 'Obtener Todos los Empleados', description: 'Permiso para obtener todos los empleados.' },
  { name: 'Obtener Empleado por ID', description: 'Permiso para obtener un empleado por ID.' },
  { name: 'Crear Empleado', description: 'Permiso para crear un nuevo empleado.' },
  { name: 'Actualizar Empleado', description: 'Permiso para actualizar un empleado existente.' },
  { name: 'Eliminar Empleado', description: 'Permiso para eliminar un empleado.' },

  // Permisos de pedidos
  { name: 'Obtener Todos los Pedidos', description: 'Permiso para obtener todos los pedidos.' },
  { name: 'Obtener Pedido por ID', description: 'Permiso para obtener un pedido por ID.' },
  { name: 'Crear Pedido', description: 'Permiso para crear un nuevo pedido.' },
  { name: 'Actualizar Pedido', description: 'Permiso para actualizar un pedido existente.' },
  { name: 'Eliminar Pedido', description: 'Permiso para eliminar un pedido.' },
  { name: 'Obtener Pedidos Asignados a Domiciliario', description: 'Permiso para obtener pedidos asignados a un domiciliario.' },
  { name: 'Contar Pedidos Completados por Domiciliario', description: 'Permiso para contar pedidos completados por un domiciliario.' },
  { name: 'Obtener Pedidos Asignados a Empleado', description: 'Permiso para obtener pedidos asignados a un empleado.' },
  { name: 'Contar Pedidos Completados por Empleado', description: 'Permiso para contar pedidos completados por un empleado.' },

  // Permisos de productos
  { name: 'Obtener Todos los Productos', description: 'Permiso para obtener todos los productos.' },
  { name: 'Obtener Producto por ID', description: 'Permiso para obtener un producto por ID.' },
  { name: 'Crear Producto', description: 'Permiso para crear un nuevo producto.' },
  { name: 'Actualizar Producto', description: 'Permiso para actualizar un producto existente.' },
  { name: 'Eliminar Producto', description: 'Permiso para eliminar un producto.' },

  // Permisos de roles y permisos
  { name: 'Crear Rol', description: 'Permiso para crear un nuevo rol.' },
  { name: 'Obtener Todos los Roles', description: 'Permiso para obtener todos los roles.' },
  { name: 'Obtener Rol por ID', description: 'Permiso para obtener un rol por ID.' },
  { name: 'Actualizar Rol', description: 'Permiso para actualizar un rol existente.' },
  { name: 'Eliminar Rol', description: 'Permiso para eliminar un rol.' },
  { name: 'Crear Permiso', description: 'Permiso para crear un nuevo permiso.' },
  { name: 'Obtener Todos los Permisos', description: 'Permiso para obtener todos los permisos.' },
  { name: 'Obtener Permiso por ID', description: 'Permiso para obtener un permiso por ID.' },
  { name: 'Actualizar Permiso', description: 'Permiso para actualizar un permiso existente.' },
  { name: 'Eliminar Permiso', description: 'Permiso para eliminar un permiso.' }
];

const createRolesAndPermissions = async () => {
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

    console.log('Permisos creados exitosamente.');

    // Crear roles
    const roles = [
      { name: 'Administrador', description: 'Rol con todos los permisos.' },
      { name: 'Cliente', description: 'Rol para clientes con permisos básicos.' },
      { name: 'Empleado', description: 'Rol para empleados con permisos básicos.' },
      { name: 'Domiciliario', description: 'Rol para domiciliarios con permisos básicos.' }
    ];

    for (const role of roles) {
      await Role.findOrCreate({
        where: { name: role.name },
        defaults: role
      });
    }

    console.log('Roles creados exitosamente.');

    // Obtener todos los permisos
    const allPermissions = await Permission.findAll();
    const permissionMap = allPermissions.reduce((map, perm) => {
      map[perm.name] = perm.id;
      return map;
    }, {});

    // Obtener todos los roles
    const allRoles = await Role.findAll();
    const roleMap = allRoles.reduce((map, role) => {
      map[role.name] = role.id;
      return map;
    }, {});

    // Asignar permisos al rol Administrador
    const adminRolePermissions = permissions.map(perm => ({
      roleId: roleMap['Administrador'],
      permissionId: permissionMap[perm.name]
    }));

    await RolePermission.bulkCreate(adminRolePermissions);

    console.log('Permisos asignados al rol Administrador.');

    // Asignar permisos básicos a los otros roles
    const basicPermissions = [
      'Obtener Todos los Clientes',
      'Obtener Cliente por ID',
      'Actualizar Cliente',
      'Crear Cliente',
      'Eliminar Cliente',
      'Obtener Todos los Detalles de Pedido',
      'Obtener Detalle de Pedido por ID',
      'Actualizar Detalle de Pedido',
      'Crear Detalle de Pedido',
      'Eliminar Detalle de Pedido',
      'Obtener Todos los Domiciliarios',
      'Obtener Domiciliario por ID',
      'Actualizar Domiciliario',
      'Crear Domiciliario',
      'Eliminar Domiciliario',
      'Obtener Todos los Empleados',
      'Obtener Empleado por ID',
      'Actualizar Empleado',
      'Crear Empleado',
      'Eliminar Empleado',
      'Obtener Todos los Pedidos',
      'Obtener Pedido por ID',
      'Actualizar Pedido',
      'Crear Pedido',
      'Eliminar Pedido',
      'Obtener Todos los Productos',
      'Obtener Producto por ID',
      'Actualizar Producto',
      'Crear Producto',
      'Eliminar Producto'
    ];

    for (const roleName of ['Cliente', 'Empleado', 'Domiciliario']) {
      const roleId = roleMap[roleName];
      const permissionsToAssign = basicPermissions.map(permName => ({
        roleId,
        permissionId: permissionMap[permName]
      }));

      await RolePermission.bulkCreate(permissionsToAssign);
    }

    console.log('Permisos básicos asignados a roles específicos.');

  } catch (error) {
    console.error('Error al crear roles y permisos:', error);
  } finally {
    await sequelize.close();
  }
};

createRolesAndPermissions();
