const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cliente = require('../models/cliente');
const Empleado = require('../models/empleado');
const Domiciliario = require('../models/domiciliario');
const Role = require('../models/Role'); // Asegúrate de importar el modelo Role
const nodemailer = require('nodemailer');

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8866734496e7c0",
    pass: "b7aec2fb81c56b"
  }
});

// Función para generar un token JWT con información del rol
const generateToken = (id, userType, roleId, roleName) => {
  return jwt.sign({ id, userType, roleId, roleName }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función para generar un token de restablecimiento
const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
};

// Función para autenticar al usuario y obtener su rol
const authenticateUser = async (Model, email, password) => {
  const user = await Model.findOne({ where: { email }, include: Role });
  if (!user || !(await bcrypt.compare(password, user.contraseña))) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Verificamos que el usuario tenga un rol asignado
  const userRole = user.Role || {};
  const roleId = userRole.id || null;
  const roleName = userRole.name || null;

  const token = generateToken(user.id, Model.name.toLowerCase(), roleId, roleName);
  return { token, userType: Model.name.toLowerCase(), roleId, roleName };
};

// Función principal para autenticar a cualquier tipo de usuario
const authenticate = async (email, password) => {
  const models = [Cliente, Empleado, Domiciliario];
  for (const Model of models) {
    try {
      return await authenticateUser(Model, email, password);
    } catch (error) {
      // Continuar al siguiente modelo si no se encuentra el usuario
    }
  }
  throw new Error('Usuario no encontrado');
};

// Función para obtener un usuario por correo electrónico
const getUserByEmail = async (email) => {
  const models = [Cliente, Empleado, Domiciliario];
  for (const Model of models) {
    const user = await Model.findOne({ where: { email } });
    if (user) return user;
  }
  return null;
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
const resetPassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const models = [Cliente, Empleado, Domiciliario];
  for (const Model of models) {
    const user = await Model.findOne({ where: { email } });
    if (user) {
      await Model.update({ contraseña: hashedPassword }, { where: { email } });
      return { message: 'Contraseña restablecida exitosamente' };
    }
  }
  throw new Error('Usuario no encontrado');
};

module.exports = {
  authenticate,
  getUserByEmail,
  generateResetToken,
  sendResetEmail,
  resetPassword
};
