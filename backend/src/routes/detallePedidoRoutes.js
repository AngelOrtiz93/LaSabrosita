// src/routes/detallePedidoRoutes.js
const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para detalle de pedidos
router.get('/', authMiddleware, detallePedidoController.getAllDetallePedidos);
router.get('/:id', authMiddleware, detallePedidoController.getDetallePedidoById);
router.post('/', authMiddleware, detallePedidoController.createDetallePedido);
router.put('/:id', authMiddleware, detallePedidoController.updateDetallePedido);
router.delete('/:id', authMiddleware, detallePedidoController.deleteDetallePedido);

module.exports = router;
