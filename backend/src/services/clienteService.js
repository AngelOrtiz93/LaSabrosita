const Cliente = require('../models/usuario');  // Ajusta la ruta según sea necesario
const Role = require('../models/Role');  // Ajusta la ruta según sea necesario

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
    // Crear el cliente y asignar roles
    const cliente = await Cliente.create(data);
    
    // Asigna el rol 'Cliente' automáticamente
    if (data.roleId) {
      await cliente.setRoles([data.roleId]); // Asigna los roles al cliente
    }

    return cliente;
  } catch (error) {
    console.error('Error al crear cliente:', error);
    throw new Error('Error al crear cliente: ' + error.message);
  }
};


const updateCliente = async (id, data) => {
  try {
    // Actualiza los datos del cliente
    const [updated] = await Cliente.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Cliente no encontrado');
    }

    // Vuelve a obtener el cliente actualizado
    const cliente = await Cliente.findByPk(id);

    // Actualiza las asociaciones de roles
    if (data.roleId && data.roleId.length > 0) {
      await cliente.setRoles(data.roleId); // `setRoles` acepta un array de IDs
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
