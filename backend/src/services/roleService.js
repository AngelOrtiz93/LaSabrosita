const Role = require('../models/Role');
const Permission = require('../models/permission');
const RolePermission = require('../models/rolePermission');

// Crear un nuevo rol
exports.createRole = async ({ name, description, permissions }) => {
  try {
    const newRole = await Role.create({ name, description });

    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map(permissionId => 
          RolePermission.create({ roleId: newRole.id, permissionId })
        )
      );
    }

    return newRole;
  } catch (error) {
    throw new Error('Error al crear rol: ' + error.message);
  }
};

// Obtener todos los roles
exports.getAllRoles = async () => {
  try {
    return await Role.findAll({
      include: {
        model: Permission,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al obtener roles: ' + error.message);
  }
};

// Obtener un rol por ID
exports.getRoleById = async (id) => {
  try {
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] }
      }
    });

    if (!role) {
      throw new Error('Rol no encontrado');
    }

    return role;
  } catch (error) {
    throw new Error('Error al obtener rol: ' + error.message);
  }
};

// Actualizar un rol
exports.updateRole = async (id, { name, description, permissions }) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) throw new Error('Rol no encontrado');

    await role.update({ name, description });

    // Eliminar permisos antiguos
    await RolePermission.destroy({ where: { roleId: role.id } });

    if (permissions && permissions.length > 0) {
      await Promise.all(
        permissions.map(permissionId => 
          RolePermission.create({ roleId: role.id, permissionId })
        )
      );
    }

    return role;
  } catch (error) {
    throw new Error('Error al actualizar rol: ' + error.message);
  }
};

// Eliminar un rol
exports.deleteRole = async (id) => {
  try {
    const deleted = await Role.destroy({ where: { id } });
    if (!deleted) {
      throw new Error('Rol no encontrado');
    }
    return deleted;
  } catch (error) {
    throw new Error('Error al eliminar rol: ' + error.message);
  }
};
