const domiciliarioService = require('../services/domiciliarioService');
const bcrypt = require('bcrypt');

exports.getAllDomiciliarios = async (req, res) => {
  try {
    const domiciliarios = await domiciliarioService.getAll();
    res.json(domiciliarios);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching domiciliarios' });
  }
};

exports.getDomiciliarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const domiciliario = await domiciliarioService.getById(id);
    if (!domiciliario) return res.status(404).json({ error: 'Domiciliario not found' });
    res.json(domiciliario);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching domiciliario' });
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
    res.status(500).json({ error: 'Error creating domiciliario' });
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

    const updatedDomiciliario = await domiciliarioService.update(id, updates);
    if (!updatedDomiciliario) return res.status(404).json({ error: 'Domiciliario not found' });
    res.json(updatedDomiciliario);
  } catch (error) {
    res.status(500).json({ error: 'Error updating domiciliario' });
  }
};

exports.deleteDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await domiciliarioService.delete(id);
    if (!deleted) return res.status(404).json({ error: 'Domiciliario not found' });
    res.status(200).json({ message: 'Domiciliario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting domiciliario' });
  }
};
