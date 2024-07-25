// src/controllers/pedidoController.js

const pedidoService = require('../services/pedidoService');

// Obtener todos los pedidos
exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    res.status(500).json({ error: 'Error fetching pedidos' });
  }
};

// Obtener un pedido por ID
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

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  try {
    const newPedido = await pedidoService.createPedido(req.body);
    res.status(201).json(newPedido);
  } catch (error) {
    console.error('Error creating pedido:', error);
    res.status(500).json({ error: 'Error creating pedido' });
  }
};

// Actualizar un pedido
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

// Eliminar un pedido
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

// Obtener pedidos asignados a un domiciliario
exports.getPedidosAsignadosDomiciliario = async (req, res) => {
  try {
    const { domiciliarioId } = req.params;
    const pedidos = await pedidoService.getPedidosAsignados(domiciliarioId);
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching assigned orders:', error);
    res.status(500).json({ error: 'Error fetching assigned orders' });
  }
};

// Contar pedidos completados por un domiciliario
exports.countPedidosCompletados = async (req, res) => {
  try {
    const { domiciliarioId } = req.params;
    const count = await pedidoService.countPedidosCompletados(domiciliarioId);
    res.json({ count });
  } catch (error) {
    console.error('Error counting completed orders:', error);
    res.status(500).json({ error: 'Error counting completed orders' });
  }
};

// Obtener pedidos asignados a un empleado
exports.getPedidosAsignadosEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const pedidos = await pedidoService.getPedidosAsignadosEmpleado(empleadoId);
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos for empleado:', error);
    res.status(500).json({ error: 'Error fetching pedidos for empleado' });
  }
};

// Contar pedidos completados por un empleado
exports.countPedidosCompletadosEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const count = await pedidoService.countPedidosCompletadosEmpleado(empleadoId);
    res.json({ count });
  } catch (error) {
    console.error('Error counting completed orders:', error);
    res.status(500).json({ error: 'Error counting completed orders' });
  }
};

