// src/routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para roles
router.post('/', authMiddleware, authorize('Crear Rol'), roleController.createRole);
router.get('/', authMiddleware, authorize('Obtener Todos los Roles'), roleController.getAllRoles);
router.get('/:id', authMiddleware, authorize('Obtener Rol por ID'), roleController.getRoleById);
router.put('/:id', authMiddleware, authorize('Actualizar Rol'), roleController.updateRole);
router.delete('/:id', authMiddleware, authorize('Eliminar Rol'), roleController.deleteRole);

module.exports = router;