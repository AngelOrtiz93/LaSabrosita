const Usuario = require('../models/usuario'); // Modelo actualizado a `Usuarios`

// Obtiene todos los usuarios
const getAllUsuarios = async () => {
  try {
    console.log('Obteniendo todos los usuarios...');
    const usuarios = await Usuario.findAll();
    console.log('Usuarios obtenidos:', usuarios);
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};


// Obtiene un usuario por su ID
const getUsuarioById = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error); // Log para depuración
    throw new Error('Error al obtener usuario: ' + error.message);
  }
};

// Crea un nuevo usuario
const createUsuario = async (data) => {
  try {
    // Establece el rol por defecto si no se proporciona
    const defaultRoleId = '1b974863-d7e7-4967-b897-2aff9d4834ab';
    const roleId = data.roleId || defaultRoleId;

    return await Usuario.create({
      ...data,
      roleId
    });
  } catch (error) {
    console.error('Error al crear usuario:', error); // Log para depuración
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

// Actualiza un usuario existente
const updateUsuario = async (id, data) => {
  try {
    // Actualiza el usuario
    const [updated] = await Usuario.update(data, { where: { id } });
    if (!updated) throw new Error('Usuario no encontrado');

    return await Usuario.findByPk(id);
  } catch (error) {
    console.error('Error al actualizar usuario:', error); // Log para depuración
    throw new Error('Error al actualizar usuario: ' + error.message);
  }
};

// Elimina un usuario
const deleteUsuario = async (id) => {
  try {
    const deleted = await Usuario.destroy({ where: { id } });
    if (!deleted) throw new Error('Usuario no encontrado');
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar usuario:', error); // Log para depuración
    throw new Error('Error al eliminar usuario: ' + error.message);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
