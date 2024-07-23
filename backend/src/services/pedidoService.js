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

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido
};
