const empleadoService = require('../services/empleadoService');
const bcrypt = require('bcrypt');

// ID del rol de empleado
const EMPLEADO_ROLE_ID = '75072156-018a-4015-aab4-64801d8b6d03';

exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAllEmpleados(); // Solo empleados con roleId específico
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoService.getEmpleadoById(id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
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
      tipoUsuario: 'Empleado'
    });
    res.status(201).json(newEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedEmpleado = await empleadoService.updateEmpleado(id, updates);
    if (!updatedEmpleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(updatedEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await empleadoService.deleteEmpleado(id);
    if (!result) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
