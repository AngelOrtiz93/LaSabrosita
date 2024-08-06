const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController'); // Cambiar el controlador a usuarioController
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

// Rutas para usuarios
router.get('/', authMiddleware, authorize('Obtener Todos los Usuarios'), usuarioController.getAllUsuarios); // Cambiar funciones a las del controlador de usuarios
router.get('/:id', authMiddleware, authorize('Obtener Usuario por ID'), usuarioController.getUsuarioById);
router.post('/', authMiddleware, authorize('Crear Usuario'), usuarioController.createUsuario);
router.put('/:id', authMiddleware, authorize('Actualizar Usuario'), usuarioController.updateUsuario);
router.delete('/:id', authMiddleware, authorize('Eliminar Usuario'), usuarioController.deleteUsuario);

module.exports = router;
