// src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para productos
router.get('/', authMiddleware, authorize('Obtener Todos los Productos'), productoController.getAllProductos);
router.get('/:id', authMiddleware, authorize('Obtener Producto por ID'), productoController.getProductoById);
router.post('/', authMiddleware, authorize('Crear Producto'), productoController.createProducto);
router.put('/:id', authMiddleware, authorize('Actualizar Producto'), productoController.updateProducto);
router.delete('/:id', authMiddleware, authorize('Eliminar Producto'), productoController.deleteProducto);

module.exports = router;