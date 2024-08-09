const { authenticateUsuario, getUsuarioByEmail, generateResetToken, sendResetEmail, resetUsuarioPassword } = require('../services/authService');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const usuario = await authenticateUsuario(email, password);

    if (!usuario.token) {
      return res.status(401).json({ message: 'Autenticación fallida, token no generado' });
    }

    // Asegúrate de que roleNames y roleIds están en la respuesta
    res.json({ 
      token: usuario.token, 
      userId: usuario.id, // Incluye userId
      roleIds: usuario.roleIds, 
      roleNames: usuario.roleNames 
    });
  } catch (error) {
    const statusCode = error.message === 'Credenciales incorrectas' ? 401 : 500;
    const message = error.message === 'Credenciales incorrectas' ? 'Email o contraseña incorrectos' : 'Error en el servidor al intentar iniciar sesión';
    res.status(statusCode).json({ message });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email es requerido' });
  }

  try {
    const user = await getUsuarioByEmail(email);
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

const resetPasswordHandler = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const email = decoded.email;

    await resetUsuarioPassword(email, newPassword);

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    const statusCode = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? 400 : 500;
    const message = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? 'Token inválido o expirado' : 'Error al restablecer la contraseña';
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword: resetPasswordHandler
};
