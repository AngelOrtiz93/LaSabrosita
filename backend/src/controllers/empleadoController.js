const Empleado = require('../models/empleado');
const bcrypt = require('bcrypt');

exports.getAllEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching empleados' });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if (!empleado) return res.status(404).json({ error: 'Empleado not found' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching empleado' });
  }
};

exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    
    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newEmpleado = await Empleado.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
    });

    res.status(201).json(newEmpleado);
  } catch (error) {
    console.error('Error creating empleado:', error);
    res.status(500).json({ error: 'Error creating empleado' });
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

    const [updated] = await Empleado.update(updates, {
      where: { id }
    });

    if (updated) {
      const updatedEmpleado = await Empleado.findByPk(id);
      res.json(updatedEmpleado);
    } else {
      res.status(404).json({ error: 'Empleado not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating empleado' });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Empleado.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Empleado not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting empleado' });
  }
};
