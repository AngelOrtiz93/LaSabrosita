// src/routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para permisos
router.post('/', authMiddleware, authorize('Crear Permiso'), permissionController.createPermission);
router.get('/', permissionController.getAllPermissions);
router.get('/:id', authMiddleware, authorize('Obtener Permiso por ID'), permissionController.getPermissionById);
router.put('/:id', authMiddleware, authorize('Actualizar Permiso'), permissionController.updatePermission);
router.delete('/:id', authMiddleware, authorize('Eliminar Permiso'), permissionController.deletePermission);

module.exports = router;