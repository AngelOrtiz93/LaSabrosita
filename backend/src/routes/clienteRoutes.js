const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para clientes
router.get('/', authMiddleware, authorize('Obtener Todos los Clientes'), clienteController.getAllClientes);
router.get('/:id', authMiddleware, authorize('Obtener Cliente por ID'), clienteController.getClienteById);
router.post('/', authMiddleware, authorize('Crear Cliente'), clienteController.createCliente);
router.put('/:id', authMiddleware, authorize('Actualizar Cliente'), clienteController.updateCliente);
router.delete('/:id', authMiddleware, authorize('Eliminar Cliente'), clienteController.deleteCliente);

module.exports = router;
