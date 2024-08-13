const empleadoService = require('../services/empleadoService');
const bcrypt = require('bcrypt');

// Obtener todos los empleados
exports.getAllEmpleados = async (req, res) => {
  try {
    const roleIds = req.user.roles.map(role => role.id); 
    const empleados = await empleadoService.getAllEmpleados(roleIds); 
    res.status(200).json({ message: 'Empleados obtenidos exitosamente', data: empleados });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// Obtener empleado por ID
exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoService.getEmpleadoById(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json({ message: 'Empleado obtenido exitosamente', data: empleado });
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const empleadoRoleId = '93188656-0203-43b6-bda0-429c420e7f0e'; 

    const newEmpleado = await empleadoService.createEmpleado({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: empleadoRoleId,
    });

    res.status(201).json({ message: 'Empleado creado exitosamente', data: newEmpleado });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

// Actualizar un empleado existente
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
    res.status(200).json({ message: 'Empleado actualizado exitosamente', data: updatedEmpleado });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

// Eliminar un empleado
exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await empleadoService.deleteEmpleado(id);
    if (!result) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
