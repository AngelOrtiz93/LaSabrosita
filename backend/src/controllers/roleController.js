const roleService = require('../services/roleService');
const Role = require('../models/Role');
const Permission = require('../models/permission'); // Asegúrate de que el nombre de archivo y la importación sean correctos
const RolePermission = require('../models/rolePermission');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { nombre, permisos } = req.body;
    const newRole = await roleService.createRole({ name: nombre, permissions: permisos });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ error: 'Error al crear rol', details: error.message });
  }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles', details: error.message });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({ error: 'Error al obtener rol', details: error.message });
  }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, permisos } = req.body;
    const updatedRole = await roleService.updateRole(id, { name: nombre, permissions: permisos });
    if (!updatedRole) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(updatedRole);
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ error: 'Error al actualizar rol', details: error.message });
  }
};


// Eliminar un rol
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await roleService.deleteRole(id);
    if (!result) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(200).json({ message: 'Rol eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ error: 'Error al eliminar rol', details: error.message });
  }
};
