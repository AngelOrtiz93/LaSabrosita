const Empleado = require('../models/empleado');

// Obtener todos los empleados
const getAllEmpleados = async () => {
  try {
    return await Empleado.findAll();
  } catch (error) {
    throw new Error('Error al obtener empleados: ' + error.message);
  }
};

// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
  try {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) throw new Error('Empleado no encontrado');
    return empleado;
  } catch (error) {
    throw new Error('Error al obtener empleado: ' + error.message);
  }
};

// Crear un nuevo empleado
const createEmpleado = async (data) => {
  try {
    return await Empleado.create(data);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw new Error('Error al crear empleado: ' + error.message);
  }
};

// Actualizar un empleado
const updateEmpleado = async (id, data) => {
  try {
    const [updated] = await Empleado.update(data, { where: { id } });
    if (!updated) throw new Error('Empleado no encontrado');
    return await Empleado.findByPk(id);
  } catch (error) {
    throw new Error('Error al actualizar empleado: ' + error.message);
  }
};

// Eliminar un empleado
const deleteEmpleado = async (id) => {
  try {
    const deleted = await Empleado.destroy({ where: { id } });
    if (!deleted) throw new Error('Empleado no encontrado');
    return { message: 'Empleado eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar empleado: ' + error.message);
  }
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};
