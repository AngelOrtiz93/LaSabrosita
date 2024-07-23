const DetallePedido = require('../models/detallePedido');

const getAllDetallePedidos = async () => {
  return await DetallePedido.findAll();
};

const getDetallePedidoById = async (id) => {
  return await DetallePedido.findByPk(id);
};

const createDetallePedido = async (data) => {
  try {
    return await DetallePedido.create(data);
  } catch (error) {
    console.error('Error creating detalle pedido:', error);
    throw error;
  }
};


const updateDetallePedido = async (id, data) => {
  const detallePedido = await DetallePedido.findByPk(id);
  if (!detallePedido) throw new Error('Detalle de pedido no encontrado');
  return await detallePedido.update(data);
};

const deleteDetallePedido = async (id) => {
  const detallePedido = await DetallePedido.findByPk(id);
  if (!detallePedido) throw new Error('Detalle de pedido no encontrado');
  return await detallePedido.destroy();
};

module.exports = {
  getAllDetallePedidos,
  getDetallePedidoById,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido
};
