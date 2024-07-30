// src/routes/detallePedidoRoutes.js
const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para detalle de pedidos
router.get('/', authMiddleware, authorize('Obtener Todos los Detalles de Pedido'), detallePedidoController.getAllDetallePedidos);
router.get('/:id', authMiddleware, authorize('Obtener Detalle de Pedido por ID'), detallePedidoController.getDetallePedidoById);
router.post('/', authMiddleware, authorize('Crear Detalle de Pedido'), detallePedidoController.createDetallePedido);
router.put('/:id', authMiddleware, authorize('Actualizar Detalle de Pedido'), detallePedidoController.updateDetallePedido);
router.delete('/:id', authMiddleware, authorize('Eliminar Detalle de Pedido'), detallePedidoController.deleteDetallePedido);

module.exports = router;