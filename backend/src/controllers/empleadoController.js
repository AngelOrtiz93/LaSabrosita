const empleadoService = require('../services/empleadoService');
const bcrypt = require('bcrypt');

exports.getAllEmpleados = async (req, res) => {
  try {
    const roleId = req.user.roles.map(role => role.id); // Obtén todos los roles del usuario autenticado
    const empleados = await empleadoService.getAllEmpleados(roleId); // Pasa los roles al servicio
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoService.getEmpleadoById(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newEmpleado = await empleadoService.createEmpleado({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: req.user.roles.length > 0 ? req.user.roles[0].id : null, // Usa el roleId del usuario autenticado si es necesario
    });
    res.status(201).json(newEmpleado);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedEmpleado = await empleadoService.updateEmpleado(id, { ...updates, roleId });
    if (!updatedEmpleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(updatedEmpleado);
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await empleadoService.deleteEmpleado(id);
    if (!result) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
