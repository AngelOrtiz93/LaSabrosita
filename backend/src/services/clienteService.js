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

// Crear un nuevo clienteconst { Cliente } = require('../models/cliente');

// Obtener todos los clientes
const getAllClientes = async () => {
  try {
    return await Cliente.findAll();
  } catch (error) {
    throw new Error('Error al obtener clientes: ' + error.message);
  }
};

// Obtener un cliente por ID
const getClienteById = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener cliente: ' + error.message);
  }
};

// Crear un nuevo cliente
const createCliente = async (data) => {
  try {
    return await Cliente.create(data);
  } catch (error) {
    throw new Error('Error al crear cliente: ' + error.message);
  }
};

// Actualizar un cliente
const updateCliente = async (id, data) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    return await cliente.update(data);
  } catch (error) {
    throw new Error('Error al actualizar cliente: ' + error.message);
  }
};

// Eliminar un cliente
const deleteCliente = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente no encontrado');
    return await cliente.destroy();
  } catch (error) {
    throw new Error('Error al eliminar cliente: ' + error.message);
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};

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
