// src/services/pedidoService.js

const Pedido = require('../models/pedido');

const getAllPedidos = async () => {
  return await Pedido.findAll();
};

const getPedidoById = async (id) => {
  return await Pedido.findByPk(id);
};

const createPedido = async (data) => {
  return await Pedido.create(data);
};

const updatePedido = async (id, data) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error('Pedido not found');
  return await pedido.update(data);
};

const deletePedido = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error('Pedido not found');
  return await pedido.destroy();
};

// Función para obtener pedidos asignados a un domiciliario
const getPedidosAsignados = async (domiciliarioId) => {
  return await Pedido.findAll({
    where: {
      domiciliarioId: domiciliarioId
    }
  });
};

// Función para contar pedidos completados
const countPedidosCompletados = async (domiciliarioId) => {
  return await Pedido.count({
    where: {
      domiciliarioId: domiciliarioId,
      estado: 'Completed' // Asume que 'estado' es el campo que indica si el pedido está completado
    }
  });
};

// Función para obtener pedidos asignados a un empleado
const getPedidosAsignadosEmpleado = async (empleadoId) => {
  return await Pedido.findAll({
    where: {
      empleadoId: empleadoId
    }
  });
};

// Función para contar pedidos completados por un empleado
const countPedidosCompletadosEmpleado = async (empleadoId) => {
  return await Pedido.count({
    where: {
      empleadoId: empleadoId,
      estado: 'Completed' // Asume que 'estado' es el campo que indica si el pedido está completado
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
