const { authenticate, getUserByEmail, generateResetToken, sendResetEmail, resetPassword: resetPasswordService } = require('../services/authService');
const jwt = require('jsonwebtoken');

// Función para el inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    // Intento de autenticación
    const { token, userType, roleId, roleName } = await authenticate(email, password);
    res.json({ token, userType, roleId, roleName });
  } catch (error) {
    // Mensaje de error específico
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión' });
  }
};

// Función para solicitar el correo de restablecimiento de contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validación básica de entrada
  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const resetToken = generateResetToken(user.email);
    await sendResetEmail(user.email, resetToken);

    res.status(200).json({ message: 'Correo de restablecimiento enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo de restablecimiento' });
  }
};

// Función para restablecer la contraseña
const resetPasswordHandler = async (req, res) => {
  const { token, newPassword } = req.body;

  // Validación básica de entrada
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const email = decoded.email;

    await resetPasswordService(email, newPassword);

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    // Mensaje de error específico para el token
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword: resetPasswordHandler
};
