const domiciliarioService = require('../services/domiciliarioService');
const bcrypt = require('bcrypt');

exports.getAllDomiciliarios = async (req, res) => {
  try {
    const domiciliarios = await domiciliarioService.getAll();
    res.json(domiciliarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener domiciliarios' });
  }
};

exports.getDomiciliarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const domiciliario = await domiciliarioService.getById(id);
    if (!domiciliario) return res.status(404).json({ error: 'Domiciliario no encontrado' });
    res.json(domiciliario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener domiciliario' });
  }
};

exports.createDomiciliario = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newDomiciliario = await domiciliarioService.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
    });
    res.status(201).json(newDomiciliario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear domiciliario' });
  }
};

exports.updateDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updated = await domiciliarioService.update(id, updates);
    if (!updated) return res.status(404).json({ error: 'Domiciliario no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar domiciliario' });
  }
};

exports.deleteDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await domiciliarioService.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Domiciliario no encontrado' });
    res.status(200).json({ message: 'Domiciliario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar domiciliario' });
  }
};
