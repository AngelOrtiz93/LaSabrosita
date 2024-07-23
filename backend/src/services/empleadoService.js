// src/services/empleadoService.js
const Empleado = require('../models/empleado');

const getAllEmpleados = async () => {
  return await Empleado.findAll();
};

const getEmpleadoById = async (id) => {
  return await Empleado.findByPk(id);
};

const createEmpleado = async (data) => {
  return await Empleado.create(data);
};

const updateEmpleado = async (id, data) => {
  const empleado = await Empleado.findByPk(id);
  if (!empleado) throw new Error('Empleado no encontrado');
  return await empleado.update(data);
};

const deleteEmpleado = async (id) => {
  const empleado = await Empleado.findByPk(id);
  if (!empleado) throw new Error('Empleado no encontrado');
  return await empleado.destroy();
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};
