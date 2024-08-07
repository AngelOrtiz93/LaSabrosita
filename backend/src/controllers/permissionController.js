const Permission = require('../models/permission');

// Crear un nuevo permiso
exports.createPermission = async (req, res) => {
  try {
    const { name, description } = req.body; // Extrae 'description' del cuerpo de la solicitud
    const newPermission = await Permission.create({ name, description });
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear permiso' });
  }
};

// Obtener todos los permisos
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener permisos' });
  }
};

// Obtener un permiso por ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      res.json(permission);
    } else {
      res.status(404).json({ error: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener permiso' });
  }
};

// Actualizar un permiso
exports.updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body; // Extrae 'description' del cuerpo de la solicitud
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) throw new Error('Permiso no encontrado');
    await permission.update({ name, description });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar permiso' });
  }
};

// Eliminar un permiso
exports.deletePermission = async (req, res) => {
  try {
    const deleted = await Permission.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Permiso eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar permiso' });
  }
};
