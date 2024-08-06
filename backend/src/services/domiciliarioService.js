const Domiciliario = require('../models/usuario'); // Cambia la ruta si es necesario

const getAllDomiciliarios = async (roleId) => {
  try {
    // Devuelve solo los domiciliarios con el roleId especificado
    return await Domiciliario.findAll({ where: { roleId } });
  } catch (error) {
    throw new Error('Error al obtener domiciliarios: ' + error.message);
  }
};

const getDomiciliarioById = async (id) => {
  try {
    const domiciliario = await Domiciliario.findByPk(id);
    if (!domiciliario) throw new Error('Domiciliario no encontrado');
    return domiciliario;
  } catch (error) {
    throw new Error('Error al obtener domiciliario: ' + error.message);
  }
};

const createDomiciliario = async (data) => {
  try {
    return await Domiciliario.create(data);
  } catch (error) {
    console.error('Error al crear domiciliario:', error);
    throw new Error('Error al crear domiciliario: ' + error.message);
  }
};

const updateDomiciliario = async (id, data) => {
  try {
    const [updated] = await Domiciliario.update(data, { where: { id } });
    if (!updated) throw new Error('Domiciliario no encontrado');
    return await Domiciliario.findByPk(id);
  } catch (error) {
    throw new Error('Error al actualizar domiciliario: ' + error.message);
  }
};

const deleteDomiciliario = async (id) => {
  try {
    const deleted = await Domiciliario.destroy({ where: { id } });
    if (!deleted) throw new Error('Domiciliario no encontrado');
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
