const Empleado = require('../models/usuario'); // Asegúrate de que el modelo se llame `Empleado` y esté en el lugar correcto

// ID del rol de empleado
const EMPLEADO_ROLE_ID = '75072156-018a-4015-aab4-64801d8b6d03';

const getAllEmpleados = async () => {
  try {
    // Devuelve solo los empleados con el roleId específico
    return await Empleado.findAll({ where: { roleId: EMPLEADO_ROLE_ID } });
  } catch (error) {
    throw new Error('Error al obtener empleados: ' + error.message);
  }
};

const getEmpleadoById = async (id) => {
  try {
    const empleado = await Empleado.findOne({ where: { id, roleId: EMPLEADO_ROLE_ID } });
    if (!empleado) throw new Error('Empleado no encontrado');
    return empleado;
  } catch (error) {
    throw new Error('Error al obtener empleado: ' + error.message);
  }
};

const createEmpleado = async (data) => {
  try {
    // Asegura que el roleId esté establecido correctamente al crear un empleado
    data.roleId = EMPLEADO_ROLE_ID;
    return await Empleado.create(data);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw new Error('Error al crear empleado: ' + error.message);
  }
};

const updateEmpleado = async (id, data) => {
  try {
    // Asegura que solo se actualicen empleados con el roleId específico
    const [updated] = await Empleado.update(data, { where: { id, roleId: EMPLEADO_ROLE_ID } });
    if (!updated) throw new Error('Empleado no encontrado');
    return await Empleado.findOne({ where: { id, roleId: EMPLEADO_ROLE_ID } });
  } catch (error) {
    throw new Error('Error al actualizar empleado: ' + error.message);
  }
};

const deleteEmpleado = async (id) => {
  try {
    // Asegura que solo se eliminen empleados con el roleId específico
    const deleted = await Empleado.destroy({ where: { id, roleId: EMPLEADO_ROLE_ID } });
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
