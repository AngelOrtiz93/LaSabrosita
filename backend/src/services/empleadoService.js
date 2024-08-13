const Empleado = require('../models/usuario');  // Ajusta la ruta según sea necesario
const Role = require('../models/Role');  // Ajusta la ruta según sea necesario

const getAllEmpleados = async (roleIds) => {
  try {
    return await Empleado.findAll({
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al obtener empleados: ' + error.message);
  }
};

const getEmpleadoById = async (id) => {
  try {
    const empleado = await Empleado.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }
    return empleado;
  } catch (error) {
    throw new Error('Error al obtener empleado: ' + error.message);
  }
};

const createEmpleado = async (data) => {
  try {
    const empleado = await Empleado.create(data);
    if (data.roleId) {
      await empleado.setRoles(data.roleId); // Asigna el rol al empleado
    }
    return empleado;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw new Error('Error al crear empleado: ' + error.message);
  }
};

const updateEmpleado = async (id, data) => {
  try {
    const [updated] = await Empleado.update(data, { where: { id } });
    if (updated === 0) {
      throw new Error('Empleado no encontrado');
    }

    const empleado = await Empleado.findByPk(id);
    if (data.roleId) {
      await empleado.setRoles(data.roleId);
    }

    return await Empleado.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }
      }
    });
  } catch (error) {
    throw new Error('Error al actualizar empleado: ' + error.message);
  }
};

const deleteEmpleado = async (id) => {
  try {
    const deleted = await Empleado.destroy({ where: { id } });
    if (deleted === 0) {
      throw new Error('Empleado no encontrado');
    }
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
