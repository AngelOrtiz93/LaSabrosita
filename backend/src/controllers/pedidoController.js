const pedidoService = require('../services/pedidoService');

// Manejo de errores general
const handleError = (res, error, customMessage) => {
  console.error(customMessage, error);
  res.status(500).json({ error: customMessage });
};

// Obtener todos los pedidos
exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    handleError(res, error, 'Error al obtener pedidos');
  }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getPedidoById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    handleError(res, error, 'Error al obtener pedido');
  }
};

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  try {
    const newPedido = await pedidoService.createPedido(req.body);
    res.status(201).json(newPedido);
  } catch (error) {
    handleError(res, error, 'Error al crear pedido');
  }
};

// Actualizar un pedido
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPedido = await pedidoService.updatePedido(id, req.body);
    if (!updatedPedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(updatedPedido);
  } catch (error) {
    handleError(res, error, 'Error al actualizar pedido');
  }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pedidoService.deletePedido(id);
    if (!deleted) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json({ message: 'Pedido eliminado exitosamente' });
  } catch (error) {
    handleError(res, error, 'Error al eliminar pedido');
  }
};

// Obtener pedidos asignados a un domiciliario
exports.getPedidosAsignadosDomiciliario = async (req, res) => {
  try {
    const { domiciliarioId } = req.params;
    const pedidos = await pedidoService.getPedidosAsignados(domiciliarioId);
    res.json(pedidos);
  } catch (error) {
    handleError(res, error, 'Error al obtener pedidos asignados al domiciliario');
  }
};

// Contar pedidos completados por un domiciliario
exports.countPedidosCompletados = async (req, res) => {
  try {
    const { domiciliarioId } = req.params;
    const count = await pedidoService.countPedidosCompletados(domiciliarioId);
    res.json({ count });
  } catch (error) {
    handleError(res, error, 'Error al contar pedidos completados por domiciliario');
  }
};

// Obtener pedidos asignados a un empleado
exports.getPedidosAsignadosEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const pedidos = await pedidoService.getPedidosAsignadosEmpleado(empleadoId);
    res.json(pedidos);
  } catch (error) {
    handleError(res, error, 'Error al obtener pedidos asignados al empleado');
  }
};

// Contar pedidos completados por un empleado
exports.countPedidosCompletadosEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const count = await pedidoService.countPedidosCompletadosEmpleado(empleadoId);
    res.json({ count });
  } catch (error) {
    handleError(res, error, 'Error al contar pedidos completados por empleado');
  }
};
