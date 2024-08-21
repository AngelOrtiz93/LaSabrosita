const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const Role = require('../models/Role');
const Permission = require('../models/permission');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateToken = (id, roleIds, roleNames, permissions) => {
  return jwt.sign(
    { id, roleIds, roleNames, permissions },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const authenticateUsuario = async (email, password) => {
  const usuario = await Usuario.findOne({
    where: { email },
    include: [
      {
        model: Role,
        include: [{ model: Permission }]
      }
    ]
  });

  if (!usuario || !(await bcrypt.compare(password, usuario.contraseña))) {
    throw new Error('Credenciales incorrectas');
  }

  const roles = usuario.Roles;
  const permissions = roles.flatMap(role => role.Permissions.map(permission => permission.name));
  const token = generateToken(
    usuario.id,
    roles.map(role => role.id),
    roles.map(role => role.name),
    permissions
  );

  return { token };
};

const getUsuarioByEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};

const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
};

const sendResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const mailOptions = {
    to: email,
    subject: 'Restablecimiento de Contraseña',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h1 style="color: #FFD700; text-align: center;">La Sabrosita</h1>
        <h2 style="color: #333; text-align: center;">Restablecimiento de Contraseña</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.5; text-align: center;">
          Hola, <br> Hemos recibido una solicitud para restablecer tu contraseña. Si realizaste esta solicitud, haz clic en el botón de abajo para restablecer tu contraseña:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Restablecer Contraseña</a>
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">
          Si no solicitaste el restablecimiento de la contraseña, puedes ignorar este correo de forma segura.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          Este es un correo automático, por favor no respondas. Si necesitas ayuda, contacta con nuestro soporte.
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

const resetUsuarioPassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  await Usuario.update({ contraseña: hashedPassword }, { where: { email } });
};

module.exports = {
  authenticateUsuario,
  getUsuarioByEmail,
  generateResetToken,
  sendResetEmail,
  resetUsuarioPassword
};
