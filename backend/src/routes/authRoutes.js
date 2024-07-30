const express = require('express');
const { login, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', login);

// Ruta para solicitar el correo de restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password', resetPassword);

module.exports = router;
