const UserRole = require('../models/UserRole');
const Usuario = require('../models/usuario');
const Role = require('../models/Role');

// Asignar múltiples roles a un usuario
exports.assignRoles = async (req, res) => {
  try {
    const { userId, roleIds } = req.body; // Cambiamos a roleIds para aceptar una lista de IDs

    // Validar datos
    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
      return res.status(400).json({ message: 'Faltan datos requeridos o roleIds inválido.' });
    }

    // Verificar existencia de usuario
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar existencia de roles
    const roles = await Role.findAll({
      where: {
        id: roleIds
      }
    });

    if (roles.length !== roleIds.length) {
      return res.status(404).json({ message: 'Algunos roles no encontrados.' });
    }

    // Verificar y crear asignaciones de roles
    const assignments = [];

    for (const roleId of roleIds) {
      const existingAssignment = await UserRole.findOne({
        where: { userId, roleId }
      });

      if (!existingAssignment) {
        const newAssignment = await UserRole.create({ userId, roleId });
        assignments.push(newAssignment);
      }
    }

    res.status(201).json(assignments);
  } catch (error) {
    console.error('Error asignando roles:', error);
    res.status(500).json({ message: 'Error asignando roles.' });
  }
};
