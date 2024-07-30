const express = require('express');
const { login, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /login
 * @desc Inicia sesión de un usuario
 * @access Público
 */
router.post('/login', async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

/**
 * @route POST /forgot-password
 * @desc Solicita el restablecimiento de la contraseña
 * @access Público
 */
router.post('/forgot-password', async (req, res) => {
    try {
        await forgotPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Error al solicitar restablecimiento de contraseña' });
    }
});

/**
 * @route POST /reset-password
 * @desc Restablece la contraseña del usuario
 * @access Público
 */
router.post('/reset-password', async (req, res) => {
    try {
        await resetPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Error al restablecer la contraseña' });
    }
});

module.exports = router;
