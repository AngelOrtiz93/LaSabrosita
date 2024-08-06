const usuarioService = require('../services/usuarioService'); // Cambiar el servicio a usuarioService
const bcrypt = require('bcrypt');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error); // Log para depuración
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getUsuarioById(id); // Cambiar a usuario
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error); // Log para depuración
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Establecer el ID del rol de Administrador si no se proporciona uno
    const defaultRoleId = '1b974863-d7e7-4967-b897-2aff9d4834ab';
    const newRoleId = roleId || defaultRoleId;

    // Crear el usuario con el rol especificado
    const newUsuario = await usuarioService.createUsuario({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: newRoleId,
    });

    res.status(201).json(newUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error); // Log para depuración
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    // Actualizar el usuario con el nuevo roleId si se proporciona
    if (roleId) {
      updates.roleId = roleId;
    }

    const updatedUsuario = await usuarioService.updateUsuario(id, updates); // Cambiar a updatedUsuario
    if (!updatedUsuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(updatedUsuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error); // Log para depuración
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioService.deleteUsuario(id); // Cambiar a deleteUsuario
    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar usuario:', error); // Log para depuración
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
