// src/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para pedidos
router.get('/', authMiddleware, authorize('Obtener Todos los Pedidos'), pedidoController.getAllPedidos);
router.get('/:id', authMiddleware, authorize('Obtener Pedido por ID'), pedidoController.getPedidoById);
router.post('/', authMiddleware, authorize('Crear Pedido'), pedidoController.createPedido);
router.put('/:id', authMiddleware, authorize('Actualizar Pedido'), pedidoController.updatePedido);
router.delete('/:id', authMiddleware, authorize('Eliminar Pedido'), pedidoController.deletePedido);

// Ruta para obtener pedidos por cliente
router.get('/usuario/:usuarioId', authMiddleware, authorize('Obtener Pedidos por Cliente'), pedidoController.getPedidosByUsuario);



// Nuevas rutas para pedidos asignados y completados
router.get('/asignados/domiciliario/:domiciliarioId', authMiddleware, authorize('Obtener Pedidos Asignados a Domiciliario'), pedidoController.getPedidosAsignadosDomiciliario);
router.get('/completados/domiciliario/:domiciliarioId', authMiddleware, authorize('Contar Pedidos Completados por Domiciliario'), pedidoController.countPedidosCompletados);
router.get('/asignados/empleado/:empleadoId', authMiddleware, authorize('Obtener Pedidos Asignados a Empleado'), pedidoController.getPedidosAsignadosEmpleado);
router.get('/completados/empleado/:empleadoId', authMiddleware, authorize('Contar Pedidos Completados por Empleado'), pedidoController.countPedidosCompletadosEmpleado);

module.exports = router;