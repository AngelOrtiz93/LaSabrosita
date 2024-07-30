const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para pedidos
router.get('/', authMiddleware, pedidoController.getAllPedidos);
router.get('/:id', authMiddleware, pedidoController.getPedidoById);
router.post('/', authMiddleware, pedidoController.createPedido);
router.put('/:id', authMiddleware, pedidoController.updatePedido);
router.delete('/:id', authMiddleware, pedidoController.deletePedido);

// Nuevas rutas para pedidos asignados y completados
router.get('/asignados/domiciliario/:domiciliarioId', authMiddleware, pedidoController.getPedidosAsignadosDomiciliario);
router.get('/completados/domiciliario/:domiciliarioId', authMiddleware, pedidoController.countPedidosCompletados);
router.get('/asignados/empleado/:empleadoId', authMiddleware, pedidoController.getPedidosAsignadosEmpleado);
router.get('/completados/empleado/:empleadoId', authMiddleware, pedidoController.countPedidosCompletadosEmpleado);

module.exports = router;
