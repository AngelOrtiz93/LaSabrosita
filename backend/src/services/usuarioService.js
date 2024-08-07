const Usuario = require('../models/usuario');  // Ajusta la ruta según sea necesario
const Role = require('../models/Role');  // Ajusta la ruta según sea necesario

const getAllUsuarios = async (roleIds) => {
  try {
    return await Usuario.findAll({
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};

const getUsuarioById = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  } catch (error) {
    throw new Error('Error al obtener usuario: ' + error.message);
  }
};

const createUsuario = async (data) => {
  try {
    // Crear el usuario y asignar roles si se proporcionan
    const usuario = await Usuario.create(data);
    if (data.roleId) {
      await usuario.setRoles(data.roleId); // Asigna los roles al usuario
    }
    return usuario;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

const updateUsuario = async (id, data) => {
  try {
    // Actualiza los datos del usuario
    const [updated] = await Usuario.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Usuario no encontrado');
    }

    // Vuelve a obtener el usuario actualizado
    const usuario = await Usuario.findByPk(id);

    // Actualiza las asociaciones de roles
    if (data.roleId && data.roleId.length > 0) {
      await usuario.setRoles(data.roleId); // `setRoles` acepta un array de IDs
    }

    return await Usuario.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al actualizar usuario: ' + error.message);
  }
};

const deleteUsuario = async (id) => {
  try {
    const deleted = await Usuario.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error('Usuario no encontrado');
    }
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
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
