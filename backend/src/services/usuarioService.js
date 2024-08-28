const Usuario = require('../models/usuario');
const Role = require('../models/Role');

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
    const usuario = await Usuario.create(data);
    if (data.roleId) {
      await usuario.setRoles(data.roleId);
    }
    return usuario;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

const updateUsuario = async (id, data) => {
  try {
    const [updated] = await Usuario.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Usuario no encontrado');
    }

    const usuario = await Usuario.findByPk(id);
    
    if (data.roleId && data.roleId.length > 0) {
      await usuario.setRoles(data.roleId);
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
