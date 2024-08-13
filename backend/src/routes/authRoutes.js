const express = require('express');
const { login, forgotPassword, resetPassword, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout); // Añadir ruta para logout

module.exports = router;
