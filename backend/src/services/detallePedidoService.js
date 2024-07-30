const DetallePedido = require('../models/detallePedido');

// Obtener todos los detalles de pedidos
const getAllDetallePedidos = async () => {
  try {
    return await DetallePedido.findAll();
  } catch (error) {
    throw new Error('Error al obtener detalles de pedidos: ' + error.message);
  }
};

// Obtener un detalle de pedido por ID
const getDetallePedidoById = async (id) => {
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (!detallePedido) throw new Error('Detalle de pedido no encontrado');
    return detallePedido;
  } catch (error) {
    throw new Error('Error al obtener detalle de pedido: ' + error.message);
  }
};

// Crear un nuevo detalle de pedido
const createDetallePedido = async (data) => {
  try {
    return await DetallePedido.create(data);
  } catch (error) {
    console.error('Error al crear detalle de pedido:', error);
    throw new Error('Error al crear detalle de pedido: ' + error.message);
  }
};

// Actualizar un detalle de pedido
const updateDetallePedido = async (id, data) => {
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (!detallePedido) throw new Error('Detalle de pedido no encontrado');
    return await detallePedido.update(data);
  } catch (error) {
    throw new Error('Error al actualizar detalle de pedido: ' + error.message);
  }
};

// Eliminar un detalle de pedido
const deleteDetallePedido = async (id) => {
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (!detallePedido) throw new Error('Detalle de pedido no encontrado');
    return await detallePedido.destroy();
  } catch (error) {
    throw new Error('Error al eliminar detalle de pedido: ' + error.message);
  }
};

module.exports = {
  getAllDetallePedidos,
  getDetallePedidoById,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido
};
