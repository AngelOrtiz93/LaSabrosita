// src/controllers/roleController.js
const Role = require('../models/Role');
const Permission = require('../models/permission');
const RolePermission = require('../models/rolePermission');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { nombre, permisos } = req.body;
    const newRole = await Role.create({ nombre });
    
    if (permisos && permisos.length > 0) {
      await Promise.all(permisos.map(permissionId => 
        RolePermission.create({ roleId: newRole.id, permissionId })
      ));
    }
    
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rol' });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: {
        model: Permission,
        through: { attributes: [] }
      }
    });
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rol' });
  }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
  try {
    const { nombre, permisos } = req.body;
    const role = await Role.findByPk(req.params.id);
    if (!role) throw new Error('Rol no encontrado');

    await role.update({ nombre });
    
    await RolePermission.destroy({ where: { roleId: role.id } });
    
    if (permisos && permisos.length > 0) {
      await Promise.all(permisos.map(permissionId => 
        RolePermission.create({ roleId: role.id, permissionId })
      ));
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
};
