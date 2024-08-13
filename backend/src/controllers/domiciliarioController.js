const domiciliarioService = require('../services/domiciliarioService');
const bcrypt = require('bcrypt');

exports.getAllDomiciliarios = async (req, res) => {
  try {
    const roleId = req.user.roles.map(role => role.id);
    const domiciliarios = await domiciliarioService.getAllDomiciliarios(roleId);
    res.status(200).json({ message: 'Domiciliarios obtenidos exitosamente', data: domiciliarios });
  } catch (error) {
    console.error('Error al obtener domiciliarios:', error);
    res.status(500).json({ error: 'Error al obtener domiciliarios' });
  }
};

exports.getDomiciliarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const domiciliario = await domiciliarioService.getDomiciliarioById(id);
    if (!domiciliario) {
      return res.status(404).json({ error: 'Domiciliario no encontrado' });
    }
    res.status(200).json({ message: 'Domiciliario obtenido exitosamente', data: domiciliario });
  } catch (error) {
    console.error('Error al obtener domiciliario:', error);
    res.status(500).json({ error: 'Error al obtener domiciliario' });
  }
};

exports.createDomiciliario = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const domiciliarioRoleId = 'afa02f31-7bca-46e1-a7eb-ea7573462d61';

    const newDomiciliario = await domiciliarioService.createDomiciliario({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: domiciliarioRoleId,
    });

    res.status(201).json({ message: 'Domiciliario creado exitosamente', data: newDomiciliario });
  } catch (error) {
    console.error('Error al crear domiciliario:', error);
    res.status(500).json({ error: 'Error al crear domiciliario' });
  }
};

exports.updateDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedDomiciliario = await domiciliarioService.updateDomiciliario(id, { ...updates, roleId });
    if (!updatedDomiciliario) {
      return res.status(404).json({ error: 'Domiciliario no encontrado' });
    }
    res.status(200).json({ message: 'Domiciliario actualizado exitosamente', data: updatedDomiciliario });
  } catch (error) {
    console.error('Error al actualizar domiciliario:', error);
    res.status(500).json({ error: 'Error al actualizar domiciliario' });
  }
};

exports.deleteDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await domiciliarioService.deleteDomiciliario(id);
    if (!result) {
      return res.status(404).json({ error: 'Domiciliario no encontrado' });
    }
    res.status(200).json({ message: 'Domiciliario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar domiciliario:', error);
    res.status(500).json({ error: 'Error al eliminar domiciliario' });
  }
};
