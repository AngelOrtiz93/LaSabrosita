const detallePedidoService = require('../services/detallePedidoService');

exports.getAllDetallePedidos = async (req, res) => {
  try {
    const detallePedidos = await detallePedidoService.getAllDetallePedidos();
    res.json(detallePedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle pedidos' });
  }
};

exports.getDetallePedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const detallePedido = await detallePedidoService.getDetallePedidoById(id);
    if (!detallePedido) return res.status(404).json({ error: 'Detalle pedido no encontrado' });
    res.json(detallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle pedido' });
  }
};

exports.createDetallePedido = async (req, res) => {
  try {
    const { cantidad, precioUnitario, productoId, pedidoId } = req.body;
    if (!cantidad || !precioUnitario || !productoId || !pedidoId) {
      return res.status(400).json({ error: 'Faltan campos requeridos: cantidad, precioUnitario, productoId y pedidoId son requeridos.' });
    }
    const newDetallePedido = await detallePedidoService.createDetallePedido(req.body);
    res.status(201).json(newDetallePedido);
  } catch (error) {
    console.error('Error al crear detalle pedido:', error);
    res.status(500).json({ error: 'Error al crear detalle pedido' });
  }
};

exports.updateDetallePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, precioUnitario, productoId, pedidoId } = req.body;
    if (!cantidad || !precioUnitario || !productoId || !pedidoId) {
      return res.status(400).json({ error: 'Faltan campos requeridos: cantidad, precioUnitario, productoId y pedidoId son requeridos.' });
    }
    const updatedDetallePedido = await detallePedidoService.updateDetallePedido(id, req.body);
    if (!updatedDetallePedido) return res.status(404).json({ error: 'Detalle pedido no encontrado' });
    res.json(updatedDetallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar detalle pedido' });
  }
};

exports.deleteDetallePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await detallePedidoService.deleteDetallePedido(id);
    if (!deleted) return res.status(404).json({ error: 'Detalle pedido no encontrado' });
    res.status(200).json({ message: 'Detalle pedido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar detalle pedido' });
  }
};
