// src/routes/rolePermissionRoutes.js
const express = require('express');
const RolePermission = require('../models/rolePermission');
const Role = require('../models/Role');
const Permission = require('../models/permission');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Asignar permiso a rol
router.post('/', async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    // Verificar si el rol y el permiso existen
    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ error: 'Role or Permission not found' });
    }

    // Crear la asociación RolePermission
    const rolePermission = await RolePermission.create({ roleId, permissionId });
    res.status(201).json(rolePermission);
  } catch (error) {
    res.status(500).json({ error: 'Error assigning permission to role' });
  }
});

// Obtener permisos de un rol
router.get('/:roleId', authMiddleware, authorize('Obtener Todos los Permisos'), async (req, res) => {
  try {
    const { roleId } = req.params;
    
    // Encuentra los permisos del rol incluyendo los detalles del permiso
    const rolePermissions = await RolePermission.findAll({
      where: { roleId },
      include: [{
        model: Permission,
        attributes: ['id', 'name', 'description'] // Atributos que deseas devolver
      }]
    });

    // Mapea la respuesta para incluir solo los detalles necesarios del permiso
    const permissionsWithName = rolePermissions.map(rolePermission => ({
      permissionId: rolePermission.permissionId,
      permissionName: rolePermission.Permission.name,
      permissionDescription: rolePermission.Permission.description
    }));

    res.json(permissionsWithName);
  } catch (error) {
    console.error('Error al obtener los permisos del rol:', error);
    res.status(500).json({ error: 'Error al obtener permisos para el rol' });
  }
});

module.exports = router;