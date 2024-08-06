const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario'); // Cambiar el modelo a usuario
const Role = require('../models/Role'); // Asegúrate de importar el modelo Role

// Función para generar un token JWT con información del rol
const generateToken = (id, roleId, roleName) => {
  return jwt.sign({ id, roleId, roleName }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función para autenticar al usuario y obtener su rol
const authenticateUsuario = async (email, password) => {
  const usuario = await Usuario.findOne({ where: { email }, include: Role });
  
  if (!usuario || !(await bcrypt.compare(password, usuario.contraseña))) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Verificamos que el usuario tenga un rol asignado
  const userRole = usuario.Role || {};
  const roleId = userRole.id || null;
  const roleName = userRole.name || null;

  const token = generateToken(usuario.id, roleId, roleName);
  return { token, roleId, roleName };
};

// Función para obtener un usuario por correo electrónico
const getUsuarioByEmail = async (email) => {
  const usuario = await Usuario.findOne({ where: { email } });
  return usuario;
};

// Función para generar un token de restablecimiento
const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
};

// Función para enviar el correo de restablecimiento
const sendResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  await transporter.sendMail({
    to: email,
    subject: 'Restablecimiento de Contraseña',
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><p><a href="${resetUrl}">Restablecer Contraseña</a></p>`
  });
};

// Función para restablecer la contraseña del usuario
const resetUsuarioPassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const usuario = await Usuario.findOne({ where: { email } });

  if (usuario) {
    await Usuario.update({ contraseña: hashedPassword }, { where: { email } });
    return { message: 'Contraseña restablecida exitosamente' };
  }

  throw new Error('Usuario no encontrado');
};

module.exports = {
  authenticateUsuario,
  getUsuarioByEmail,
  generateResetToken,
  sendResetEmail,
  resetUsuarioPassword
};
