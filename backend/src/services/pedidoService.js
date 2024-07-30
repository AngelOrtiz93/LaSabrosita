const Pedido = require('../models/pedido');

// Obtener todos los pedidos
const getAllPedidos = async () => {
  return await Pedido.findAll();
};

// Obtener un pedido por ID
const getPedidoById = async (id) => {
  return await Pedido.findByPk(id);
};

// Crear un nuevo pedido
const createPedido = async (data) => {
  return await Pedido.create(data);
};

// Actualizar un pedido
const updatePedido = async (id, data) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error('Pedido not found');
  return await pedido.update(data);
};

// Eliminar un pedido
const deletePedido = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error('Pedido not found');
  return await pedido.destroy();
};

// Obtener pedidos asignados a un domiciliario
const getPedidosAsignados = async (domiciliarioId) => {
  return await Pedido.findAll({
    where: { domiciliarioId }
  });
};

// Contar pedidos completados por un domiciliario
const countPedidosCompletados = async (domiciliarioId) => {
  return await Pedido.count({
    where: {
      domiciliarioId,
      estado: 'Completed'
    }
  });
};

// Obtener pedidos asignados a un empleado
const getPedidosAsignadosEmpleado = async (empleadoId) => {
  return await Pedido.findAll({
    where: { empleadoId }
  });
};

// Contar pedidos completados por un empleado
const countPedidosCompletadosEmpleado = async (empleadoId) => {
  return await Pedido.count({
    where: {
      empleadoId,
      estado: 'Completed'
    }
  });
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
  getPedidosAsignados,
  countPedidosCompletados,
  getPedidosAsignadosEmpleado,
  countPedidosCompletadosEmpleado
};
