const pedidoService = require('../services/pedidoService');

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    res.status(500).json({ error: 'Error fetching pedidos' });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getPedidoById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido not found' });
    res.json(pedido);
  } catch (error) {
    console.error('Error fetching pedido:', error);
    res.status(500).json({ error: 'Error fetching pedido' });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const newPedido = await pedidoService.createPedido(req.body);
    res.status(201).json(newPedido);
  } catch (error) {
    console.error('Error creating pedido:', error);
    res.status(500).json({ error: 'Error creating pedido' });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPedido = await pedidoService.updatePedido(id, req.body);
    if (!updatedPedido) return res.status(404).json({ error: 'Pedido not found' });
    res.json(updatedPedido);
  } catch (error) {
    console.error('Error updating pedido:', error);
    res.status(500).json({ error: 'Error updating pedido' });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pedidoService.deletePedido(id);
    if (!deleted) return res.status(404).json({ error: 'Pedido not found' });
    res.status(200).json({ message: 'Pedido deleted successfully' });
  } catch (error) {
    console.error('Error deleting pedido:', error);
    res.status(500).json({ error: 'Error deleting pedido' });
  }
};
