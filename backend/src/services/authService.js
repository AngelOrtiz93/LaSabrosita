  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const Usuario = require('../models/usuario');
  const Role = require('../models/Role');
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

  // Función para generar un token JWT con información del rol
  const generateToken = (id, roleIds, roleNames) => {
    return jwt.sign({ id, roleIds, roleNames }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  const authenticateUsuario = async (email, password) => {
    try {
      const usuario = await Usuario.findOne({ 
        where: { email },
        include: [Role]
      });
  
      if (!usuario || !(await bcrypt.compare(password, usuario.contraseña))) {
        throw new Error('Credenciales incorrectas');
      }
  
      const roles = usuario.Roles;
      const roleIds = roles.map(role => role.id);
      const roleNames = roles.map(role => role.name);
  
      const token = generateToken(usuario.id, roleIds, roleNames);
      return { token, id: usuario.id, roleIds, roleNames }; // Devuelve id
    } catch (error) {
      throw new Error(`Error en la autenticación: ${error.message}`);
    }
  };
  

  const getUsuarioByEmail = async (email) => {
    try {
      return await Usuario.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Restablecimiento de Contraseña</h2>
          <p style="font-size: 16px; color: #555;">
            Para restablecer tu contraseña, haz clic en el siguiente enlace:
          </p>
          <p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Restablecer Contraseña</a>
          </p>
          <p style="font-size: 14px; color: #888;">
            Si no solicitaste el restablecimiento de la contraseña, ignora este correo electrónico.
          </p>
          <p style="font-size: 12px; color: #aaa;">
            Este es un correo automático, por favor no respondas.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error al enviar el correo de restablecimiento: ${error.message}`);
    }
  };

  const resetUsuarioPassword = async (email, newPassword) => {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const usuario = await Usuario.findOne({ where: { email } });

      if (usuario) {
        await Usuario.update({ contraseña: hashedPassword }, { where: { email } });
        return { message: 'Contraseña restablecida exitosamente' };
      }

      throw new Error('Usuario no encontrado');
    } catch (error) {
      throw new Error(`Error al restablecer la contraseña: ${error.message}`);
    }
  };

  module.exports = {
    authenticateUsuario,
    getUsuarioByEmail,
    generateResetToken,
    sendResetEmail,
    resetUsuarioPassword
  };
