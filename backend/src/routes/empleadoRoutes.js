const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para empleados
router.get('/', authMiddleware, authorize('Obtener Todos los Empleados'), empleadoController.getAllEmpleados);
router.get('/:id', authMiddleware, authorize('Obtener Empleado por ID'), empleadoController.getEmpleadoById);
router.post('/', authMiddleware, authorize('Crear Empleado'), empleadoController.createEmpleado);
router.put('/:id', authMiddleware, authorize('Actualizar Empleado'), empleadoController.updateEmpleado);
router.delete('/:id', authMiddleware, authorize('Eliminar Empleado'), empleadoController.deleteEmpleado);

module.exports = router;
