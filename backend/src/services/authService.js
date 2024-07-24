const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cliente = require('../models/cliente');
const Empleado = require('../models/empleado');
const Domiciliario = require('../models/domiciliario');
const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8866734496e7c0",
    pass: "b7aec2fb81c56b"
  }
});

// Función para generar un token JWT
const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función para generar un token de restablecimiento
const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
};

// Función para autenticar al usuario
const authenticateUser = async (Model, email, password) => {
  const user = await Model.findOne({ where: { email } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.contraseña);
  if (!isMatch) throw new Error('Contraseña incorrecta');
  const token = generateToken(user.id, Model.name.toLowerCase());
  return { token, userType: Model.name.toLowerCase() };
};

// Función principal para autenticar a cualquier tipo de usuario
const authenticate = async (email, password) => {
  let result;

  result = await authenticateUser(Cliente, email, password);
  if (result) return result;

  result = await authenticateUser(Empleado, email, password);
  if (result) return result;

  result = await authenticateUser(Domiciliario, email, password);
  if (result) return result;

  throw new Error('Usuario no encontrado');
};

// Función para obtener un usuario por correo electrónico
const getUserByEmail = async (email) => {
  let user = await Cliente.findOne({ where: { email } });
  if (user) return user;

  user = await Empleado.findOne({ where: { email } });
  if (user) return user;

  user = await Domiciliario.findOne({ where: { email } });
  if (user) return user;

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
  let user = await Cliente.findOne({ where: { email } });
  if (user) {
    await Cliente.update({ contraseña: hashedPassword }, { where: { email } });
    return { message: 'Contraseña restablecida exitosamente' };
  }

  user = await Empleado.findOne({ where: { email } });
  if (user) {
    await Empleado.update({ contraseña: hashedPassword }, { where: { email } });
    return { message: 'Contraseña restablecida exitosamente' };
  }

  user = await Domiciliario.findOne({ where: { email } });
  if (user) {
    await Domiciliario.update({ contraseña: hashedPassword }, { where: { email } });
    return { message: 'Contraseña restablecida exitosamente' };
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
