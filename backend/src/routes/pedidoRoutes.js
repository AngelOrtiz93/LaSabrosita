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

module.exports = router;
