// src/routes/domiciliarioRoutes.js
const express = require('express');
const router = express.Router();
const domiciliarioController = require('../controllers/domiciliarioController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para domiciliarios
router.get('/', authMiddleware, authorize('Obtener Todos los Domiciliarios'), domiciliarioController.getAllDomiciliarios);
router.get('/:id', authMiddleware, authorize('Obtener Domiciliario por ID'), domiciliarioController.getDomiciliarioById);
router.post('/', authMiddleware, authorize('Crear Domiciliario'), domiciliarioController.createDomiciliario);
router.put('/:id', authMiddleware, authorize('Actualizar Domiciliario'), domiciliarioController.updateDomiciliario);
router.delete('/:id', authMiddleware, authorize('Eliminar Domiciliario'), domiciliarioController.deleteDomiciliario);

module.exports = router;
