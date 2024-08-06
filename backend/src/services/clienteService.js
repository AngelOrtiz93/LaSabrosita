const Cliente = require('../models/usuario'); // Asegúrate de que el modelo se llame `Cliente` y esté en el lugar correcto

const getAllClientes = async (roleId) => {
  try {
    // Si no se proporciona roleId, devuelve todos los clientes
    if (!roleId) {
      return await Cliente.findAll();
    }
    // Devuelve solo los clientes con el roleId especificado
    return await Cliente.findAll({ where: { roleId } });
  } catch (error) {
    throw new Error('Error al obtener clientes: ' + error.message);
  }
};

const getClienteById = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener cliente: ' + error.message);
  }
};

const createCliente = async (data) => {
  try {
    return await Cliente.create(data);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    throw new Error('Error al crear cliente: ' + error.message);
  }
};

const updateCliente = async (id, data) => {
  try {
    const [updated] = await Cliente.update(data, { where: { id } });
    if (!updated) throw new Error('Cliente no encontrado');
    return await Cliente.findByPk(id);
  } catch (error) {
    throw new Error('Error al actualizar cliente: ' + error.message);
  }
};

const deleteCliente = async (id) => {
  try {
    const deleted = await Cliente.destroy({ where: { id } });
    if (!deleted) throw new Error('Cliente no encontrado');
    return { message: 'Cliente eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar cliente: ' + error.message);
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
