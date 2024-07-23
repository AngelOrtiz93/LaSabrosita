// src/routes/empleadoRoutes.js
const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para empleados
router.get('/', authMiddleware, empleadoController.getAllEmpleados);
router.get('/:id', authMiddleware, empleadoController.getEmpleadoById);
router.post('/', authMiddleware, empleadoController.createEmpleado);
router.put('/:id', authMiddleware, empleadoController.updateEmpleado);
router.delete('/:id', authMiddleware, empleadoController.deleteEmpleado);

module.exports = router;
