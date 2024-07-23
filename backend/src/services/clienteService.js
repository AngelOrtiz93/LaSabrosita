// src/services/clienteService.js
const { Cliente } = require('../models/cliente');

// Obtener todos los clientes
const getAllClientes = async () => {
  return await Cliente.findAll();
};

// Obtener un cliente por ID
const getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

// Crear un nuevo cliente
const createCliente = async (data) => {
  return await Cliente.create(data);
};

// Actualizar un cliente
const updateCliente = async (id, data) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw new Error('Cliente no encontrado');
  return await cliente.update(data);
};

// Eliminar un cliente
const deleteCliente = async (id) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw new Error('Cliente no encontrado');
  return await cliente.destroy();
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
