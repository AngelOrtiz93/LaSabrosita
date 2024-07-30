const Domiciliario = require('../models/domiciliario');

// Obtener todos los domiciliarios
exports.getAll = async () => {
  try {
    return await Domiciliario.findAll();
  } catch (error) {
    throw new Error('Error al obtener domiciliarios: ' + error.message);
  }
};

// Obtener un domiciliario por ID
exports.getById = async (id) => {
  try {
    const domiciliario = await Domiciliario.findByPk(id);
    if (!domiciliario) throw new Error('Domiciliario no encontrado');
    return domiciliario;
  } catch (error) {
    throw new Error('Error al obtener domiciliario: ' + error.message);
  }
};

// Crear un nuevo domiciliario
exports.create = async (data) => {
  try {
    return await Domiciliario.create(data);
  } catch (error) {
    console.error('Error al crear domiciliario:', error);
    throw new Error('Error al crear domiciliario: ' + error.message);
  }
};

// Actualizar un domiciliario
exports.update = async (id, updates) => {
  try {
    const [updated] = await Domiciliario.update(updates, { where: { id } });
    if (!updated) throw new Error('Domiciliario no encontrado');
    return await Domiciliario.findByPk(id);
  } catch (error) {
    throw new Error('Error al actualizar domiciliario: ' + error.message);
  }
};

// Eliminar un domiciliario
exports.delete = async (id) => {
  try {
    const deleted = await Domiciliario.destroy({ where: { id } });
    if (!deleted) throw new Error('Domiciliario no encontrado');
    return { message: 'Domiciliario eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar domiciliario: ' + error.message);
  }
};
