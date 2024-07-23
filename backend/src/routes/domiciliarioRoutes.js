// src/routes/domiciliarioRoutes.js
const express = require('express');
const router = express.Router();
const domiciliarioController = require('../controllers/domiciliarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para domiciliarios
router.get('/', authMiddleware, domiciliarioController.getAllDomiciliarios);
router.get('/:id', authMiddleware, domiciliarioController.getDomiciliarioById);
router.post('/', authMiddleware, domiciliarioController.createDomiciliario);
router.put('/:id', authMiddleware, domiciliarioController.updateDomiciliario);
router.delete('/:id', authMiddleware, domiciliarioController.deleteDomiciliario);

module.exports = router;