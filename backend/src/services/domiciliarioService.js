const Domiciliario = require('../models/usuario');  // Ajusta la ruta según sea necesario
const Role = require('../models/Role');  // Ajusta la ruta según sea necesario

const getAllDomiciliarios = async (roleIds) => {
  try {
    return await Domiciliario.findAll({
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al obtener domiciliarios: ' + error.message);
  }
};

const getDomiciliarioById = async (id) => {
  try {
    const domiciliario = await Domiciliario.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
    if (!domiciliario) {
      throw new Error('Domiciliario no encontrado');
    }
    return domiciliario;
  } catch (error) {
    throw new Error('Error al obtener domiciliario: ' + error.message);
  }
};

const createDomiciliario = async (data) => {
  try {
    // Crear el domiciliario y asignar roles si se proporcionan
    const domiciliario = await Domiciliario.create(data);
    if (data.roleId) {
      await domiciliario.setRoles(data.roleId); // Asigna los roles al domiciliario
    }
    return domiciliario;
  } catch (error) {
    console.error('Error al crear domiciliario:', error);
    throw new Error('Error al crear domiciliario: ' + error.message);
  }
};

const updateDomiciliario = async (id, data) => {
  try {
    // Actualiza los datos del domiciliario
    const [updated] = await Domiciliario.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Domiciliario no encontrado');
    }

    // Vuelve a obtener el domiciliario actualizado
    const domiciliario = await Domiciliario.findByPk(id);

    // Actualiza las asociaciones de roles
    if (data.roleId && data.roleId.length > 0) {
      await domiciliario.setRoles(data.roleId); // `setRoles` acepta un array de IDs
    }

    return await Domiciliario.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al actualizar domiciliario: ' + error.message);
  }
};

const deleteDomiciliario = async (id) => {
  try {
    const deleted = await Domiciliario.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error('Domiciliario no encontrado');
    }
    return { message: 'Domiciliario eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar domiciliario: ' + error.message);
  }
};

module.exports = {
  getAllDomiciliarios,
  getDomiciliarioById,
  createDomiciliario,
  updateDomiciliario,
  deleteDomiciliario
};
