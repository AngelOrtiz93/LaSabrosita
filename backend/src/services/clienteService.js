const Cliente = require('../models/usuario');
const Role = require('../models/Role');

const getAllClientes = async (roleIds) => {
  try {
    return await Cliente.findAll({
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al obtener clientes: ' + error.message);
  }
};

const getClienteById = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener cliente: ' + error.message);
  }
};

const createCliente = async (data) => {
  try {
    const cliente = await Cliente.create(data);
    
    if (data.roleId) {
      await cliente.setRoles([data.roleId]);
    }

    return cliente;
  } catch (error) {
    console.error('Error al crear cliente:', error);
    throw new Error('Error al crear cliente: ' + error.message);
  }
};

const updateCliente = async (id, data) => {
  try {
    const [updated] = await Cliente.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Cliente no encontrado');
    }

    const cliente = await Cliente.findByPk(id);

    if (data.roleId && data.roleId.length > 0) {
      await cliente.setRoles(data.roleId);
    }

    return await Cliente.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al actualizar cliente: ' + error.message);
  }
};

const deleteCliente = async (id) => {
  try {
    const deleted = await Cliente.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error('Cliente no encontrado');
    }
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
