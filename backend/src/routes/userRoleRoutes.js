const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController'); // Asegúrate de que esta ruta sea correcta
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Ruta para asignar múltiples roles a un usuario
router.post('/assign', authMiddleware, authorize('Asignar Roles'), userRoleController.assignRoles);

module.exports = router;
