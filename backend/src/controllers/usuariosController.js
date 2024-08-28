const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');
const upload = require('../middleware/uploadMiddleware'); // Importar configuración de multer
const { validationResult } = require('express-validator'); // Importación añadida

exports.getAllUsuarios = async (req, res) => {
  try {
    const roleId = req.user.roles.map(role => role.id);
    const usuarios = await usuarioService.getAllUsuarios(roleId);
    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      data: usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    res.status(200).json({
      message: 'Usuario obtenido exitosamente',
      data: usuario
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// Crear un nuevo usuario con imagen
exports.createUsuario = [
  upload.single('imagen'), // Middleware de multer para cargar una imagen
  async (req, res) => {
    // Ajusta el nombre del campo según sea necesario
    const contrasena = req.body.contraseña || req.body['contraseÃ±a'];
    
    console.log('Archivo recibido:', req.file);
    console.log('Datos del cuerpo:', req.body);

    // Validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, apellido, email, telefono, direccion } = req.body;

      if (!contrasena) {
        return res.status(400).json({ message: 'La contraseña es requerida' });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const newUsuario = await usuarioService.createUsuario({
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        contraseña: hashedPassword,
        imagenUrl,
        roleId: req.user.roles.length > 0 ? req.user.roles[0].id : null,
      });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: newUsuario,
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        message: 'Error al crear usuario',
        error: error.message,
      });
    }
  },
];

exports.updateUsuario = [
  upload.single('imagen'), // Middleware para procesar archivos
  async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;

    // Validaciones (si es necesario)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Preparar los datos para actualizar
      const updates = { nombre, apellido, email, telefono, direccion };

      if (contraseña) {
        updates.contraseña = await bcrypt.hash(contraseña, 10);
      }

      // Manejar la imagen
      if (req.file) {
        updates.imagenUrl = `/uploads/${req.file.filename}`;
      }

      const updatedUsuario = await usuarioService.updateUsuario(id, updates);
      if (!updatedUsuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }
      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        data: updatedUsuario
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({
        message: 'Error al actualizar usuario',
        error: error.message
      });
    }
  }
];

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioService.deleteUsuario(id);
    if (!result) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    res.status(200).json({
      message: 'Usuario eliminado exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};
