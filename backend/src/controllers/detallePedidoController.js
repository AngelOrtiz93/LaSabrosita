const detallePedidoService = require('../services/detallePedidoService');

exports.getAllDetallePedidos = async (req, res) => {
  try {
    const detallePedidos = await detallePedidoService.getAllDetallePedidos();
    res.json(detallePedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching detalle pedidos' });
  }
};

exports.getDetallePedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const detallePedido = await detallePedidoService.getDetallePedidoById(id);
    if (!detallePedido) return res.status(404).json({ error: 'Detalle pedido not found' });
    res.json(detallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching detalle pedido' });
  }
};

exports.createDetallePedido = async (req, res) => {
  try {
    const { cantidad, precioUnitario, productoId, pedidoId } = req.body;
    if (!cantidad || !precioUnitario || !productoId || !pedidoId) {
      return res.status(400).json({ error: 'Missing required fields: cantidad, precioUnitario, productoId, and pedidoId are required.' });
    }
    const newDetallePedido = await detallePedidoService.createDetallePedido(req.body);
    res.status(201).json(newDetallePedido);
  } catch (error) {
    console.error('Error creating detalle pedido:', error);
    res.status(500).json({ error: 'Error creating detalle pedido' });
  }
};



exports.updateDetallePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, precioUnitario, productoId, pedidoId } = req.body;
    if (!cantidad || !precioUnitario || !productoId || !pedidoId) {
      return res.status(400).json({ error: 'Missing required fields: cantidad, precioUnitario, productoId, and pedidoId are required.' });
    }
    const updatedDetallePedido = await detallePedidoService.updateDetallePedido(id, req.body);
    if (!updatedDetallePedido) return res.status(404).json({ error: 'Detalle pedido not found' });
    res.json(updatedDetallePedido);
  } catch (error) {
    res.status(500).json({ error: 'Error updating detalle pedido' });
  }
};

exports.deleteDetallePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await detallePedidoService.deleteDetallePedido(id);
    if (!deleted) return res.status(404).json({ error: 'Detalle pedido not found' });
    res.status(200).json({ message: 'Detalle pedido deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting detalle pedido' });
  }
};
