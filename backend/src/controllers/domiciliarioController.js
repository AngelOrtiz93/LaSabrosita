const usuarioService = require('../services/domiciliarioService');
const bcrypt = require('bcrypt');

exports.getAllDomiciliarios = async (req, res) => {
  try {
    const roleId = '2a5ea2a9-41bc-4446-8771-94f14029e675'; // RoleId de Domiciliario
    const domiciliarios = await usuarioService.getAllDomiciliarios(roleId); // Pasa el roleId al servicio
    res.json(domiciliarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener domiciliarios' });
  }
};

exports.getDomiciliarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const domiciliario = await usuarioService.getDomiciliarioById(id);
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
    const newDomiciliario = await usuarioService.createDomiciliario({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: '2a5ea2a9-41bc-4446-8771-94f14029e675', // Establece el roleId como 'Domiciliario'
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

    const updatedDomiciliario = await usuarioService.updateDomiciliario(id, updates);
    if (!updatedDomiciliario) return res.status(404).json({ error: 'Domiciliario no encontrado' });
    res.json(updatedDomiciliario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar domiciliario' });
  }
};

exports.deleteDomiciliario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioService.deleteDomiciliario(id);
    if (!result) return res.status(404).json({ error: 'Domiciliario no encontrado' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar domiciliario' });
  }
};
